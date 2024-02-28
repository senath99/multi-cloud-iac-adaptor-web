import * as yup from 'yup';

export function getAwsModel(stackName, groupId, groupName, groupRules) {
  return {
    stackName: stackName,
    provider: {
      type: 'aws',
      tfId: 'aws-provider-id',
      region: 'us-east-1'
    },
    backend: {
      type: 'local',
      path: './terraform.tf-demo.tfstate'
    },
    modules: [
      {
        moduleType: 'security-group',
        tfId: groupId,
        name: groupName
      },
      ...getAwsSecurityGroups(groupRules)
    ]
  };
}

const getAwsSecurityGroups = (securityGroupRules) => {
  let securityGroups = Object.values(securityGroupRules).map(
    ({
      tfid,
      type,
      fromPort,
      toPort,
      protocol,
      cidrBlocks,
      securityGroupId
    }) => {
      return {
        moduleType: 'security-group-rule',
        tfId: tfid,
        type: type,
        fromPort: fromPort,
        toPort: toPort,
        protocol: protocol,
        cidrBlocks: cidrBlocks,
        securityGroupId: securityGroupId
      };
    }
  );
  return securityGroups;
};

export function getAzureModel(
  stackName,
  groupId,
  groupName,
  groupLocation,
  resourceGroupName,
  networkRules
) {
  return {
    stackName: stackName,
    provider: {
      type: 'azure',
      tfId: 'azure-provider-id'
    },
    backend: {
      type: 'local',
      path: './terraform.tf-demo.tfstate'
    },
    modules: [
      {
        moduleType: 'network-security-group',
        tfId: groupId,
        name: groupName,
        location: groupLocation,
        resourceGroupName: resourceGroupName
      },
      ...getAzureNetworkGroups(networkRules, resourceGroupName)
    ]
  };
}

const getAzureNetworkGroups = (securityGroupRules, resourceGroupName) => {
  let securityGroups = Object.values(securityGroupRules).map(
    ({
      tfid,
      ruleName,
      priority,
      direction,
      access,
      protocol,
      sourcePortRange,
      destinationPortRange,
      sourceAddressPrefix,
      destinationAddressPrefix,
      networkSecurityGroupName
    }) => {
      return {
        moduleType: 'network-security-rule',
        tfId: tfid,
        name: ruleName,
        priority: priority,
        direction: direction,
        access: access,
        protocol: protocol,
        sourcePortRange: sourcePortRange,
        destinationPortRange: destinationPortRange,
        sourceAddressPrefix: sourceAddressPrefix,
        destinationAddressPrefix: destinationAddressPrefix,
        resourceGroupName: resourceGroupName,
        networkSecurityGroupName: networkSecurityGroupName
      };
    }
  );
  return securityGroups;
};

export const getAWSRefactorModel = async (awsModel) => {
  return new Promise((resolve, reject) => {
    try {
      let securityModules = {};
      console.log('ssss' + JSON.stringify(awsModel));
      awsModel?.config?.modules.forEach((item) => {
        if (item.moduleType !== 'security-group') {
          securityModules = {
            ...securityModules,
            [item?.tfId]: { ...item }
          };
        }
      });

      const result = {
        stack_name: awsModel?.stack_name,
        securityGroup: {
          name: awsModel?.config?.modules[0]?.name,
          tfId: 'sg-id'
        },
        securityModules: { ...securityModules }
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAzureRefactorModel = async (azureModel) => {
  return new Promise((resolve, reject) => {
    try {
      let networkGroup = {};
      let networkModules = {};

      azureModel?.config?.modules?.forEach((item) => {
        if (item.moduleType !== 'network-security-group') {
          networkModules = {
            ...networkModules,
            [item?.tfId]: { ...item }
          };
        } else {
          networkGroup = item;
        }
      });

      const result = {
        stack_name: azureModel?.stack_name,
        networkGroup: networkGroup,
        networkModules: { ...networkModules }
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const validateSchema = () => {
  const networkSecurityRuleSchema = yup.object().shape({
    moduleType: yup.string().equals(['network-security-rule']).required(),
    tfId: yup.string().required(),
    name: yup.string().required(),
    priority: yup.number().positive().integer().required(),
    direction: yup.string().oneOf(['Inbound', 'Outbound']).required(),
    access: yup.string().oneOf(['Allow', 'Deny']).required(),
    protocol: yup.string().required(),
    fromPort: yup.string().required('From Port is required'),
    toPort: yup.string().required(),
    sourcePortRange: yup.string().required(),
    destinationPortRange: yup.string().required(),
    sourceAddressPrefix: yup.string().required(),
    destinationAddressPrefix: yup.string().required(),
    resourceGroupName: yup.string().required(),
    networkSecurityGroupName: yup.string().required()
  });

  const schema = yup.object().shape({
    stack_name: yup.string().label('Stack Name').required(),
    security_group_name: yup.string().label('Stack Group Name').required(),
    securityRules: yup.object().shape(
      Object.keys(yup.object().required()).reduce((acc, key) => {
        acc[key] = networkSecurityRuleSchema;
        return acc;
      }, {})
    )
  });

  return schema;
};
