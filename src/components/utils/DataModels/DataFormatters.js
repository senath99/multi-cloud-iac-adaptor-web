import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { forEach } from 'lodash';

export function getAwsModel(stackName, groupId, groupName, groupRules, tags) {
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
        name: groupName,
        tags: refactorTags(tags)
      },
      ...getAwsSecurityGroups(groupRules)
    ]
  };
}

const getAwsSecurityGroups = (securityGroupRules) => {
  let securityGroups = Object.values(securityGroupRules).map(
    ({
      tfId,
      type,
      fromPort,
      toPort,
      protocol,
      cidrBlocks,
      securityGroupId
    }) => {
      return {
        moduleType: 'security-group-rule',
        tfId: tfId,
        type: type,
        fromPort: parseInt(fromPort),
        toPort: parseInt(toPort),
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
  networkRules,
  tags
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
        resourceGroupName: resourceGroupName,
        tags: refactorTags(tags)
      },
      ...getAzureNetworkGroups(networkRules, resourceGroupName)
    ]
  };
}

const getAzureNetworkGroups = (securityGroupRules, resourceGroupName) => {
  let securityGroups = Object.values(securityGroupRules).map(
    ({
      tfId,
      name,
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
        tfId: tfId,
        name: name,
        priority: parseInt(priority),
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

      awsModel?.config?.modules.forEach((item) => {
        if (item.moduleType !== 'security-group') {
          securityModules = {
            ...securityModules,
            [item?.tfId]: { ...item }
          };
        }
      });
      console.log(JSON.stringify(awsModel?.config?.modules[0]));
      const result = {
        stack_name: awsModel?.stack_name,
        securityGroup: {
          name: awsModel?.config?.modules[0]?.name,
          tfId: awsModel?.config?.modules[0]?.tfId,
          tags: decodeTags(awsModel?.config?.modules[0]?.tags)
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
        if (item?.moduleType !== 'network-security-group') {
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
        networkGroup: { ...networkGroup, tags: decodeTags(networkGroup.tags) },
        networkModules: { ...networkModules }
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const validateSchema = async (values) => {
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
    security_group_name: yup.string().label('Stack Group Name').required()
    // securityRules: yup.object().shape(
    //   Object.keys(yup.object().required()).reduce((acc, key) => {
    //     acc[key] = networkSecurityRuleSchema;
    //     return acc;
    //   }, {})
    // )
  });

  try {
    // Validate the object against the schema
    const validatedData = await schema.validate(values, { abortEarly: false });
    console.log('Data is valid:', validatedData);
    return validatedData;
  } catch (error) {
    const errors = {};

    if (error.inner) {
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
    }

    console.log('Validation errors:', errors);
    return errors;
  }
};

const refactorTags = (tags) => {
  const processedTags = Object.values(tags);
  let updatedTags = {};

  processedTags.forEach((item) => {
    updatedTags = { ...updatedTags, [item.key]: item.value };
  });

  return updatedTags;
};

const decodeTags = (tags) => {
  let updatedTags = {};
  let tag = Object.entries(tags); //[[key ,value],[]]
  console.log('TTTTT' + JSON.stringify(tag));
  if (tag == [['', '']]) {
    tag = [];
  }
  if (tag.length > 0) {
    tag.forEach((item) => {
      const guid = uuidv4();
      const element = item;
      updatedTags = {
        ...updatedTags,
        [guid]: { key: element[0], value: element[1], id: guid }
      };
    });
  } else {
    updatedTags = { 0: { key: '', value: '', id: 0 } };
  }

  return updatedTags;
};

export const getUniqueId = () => {
  const uuid = uuidv4();

  return `_${uuid}`;
};

export const getSchema = (provider) => {
  let schema = {};
  if (provider == 'aws') {
    schema = yup.object().shape({
      stack_name: yup.string().label('Stack Name').required(),
      security_group_name: yup.string().label('Security Group Name').required()
    });
  } else {
    schema = yup.object().shape({
      stack_name: yup.string().label('Stack Name').required()
      // network_security_group_name: yup
      //   .string()
      //   .label('Network Security Group Name')
      //   .required()
      // azure_location: yup.string().label('Location').required()
      // resource_group_name: yup.string().label('Resource Group Name').required()
    });
  }
  return schema;
};
