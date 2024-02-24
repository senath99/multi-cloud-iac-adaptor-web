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

export const getAWSRefactorModel = (awsModel) => {
  let securityModules = {};

  awsModel?.config?.modules.forEach((item) => {
    if (item.moduleType != 'security-group') {
      securityModules = {
        ...securityModules,
        [item?.tfId]: { ...item }
      };
    }
  });
  return {
    stack_name: awsModel?.stack_name,
    securityGroup: {
      name: awsModel?.config?.modules[0]?.name,
      tfId: 'sg-id'
    },
    securityModules: { ...securityModules }
  };
};

export const getAzureRefactorModel = (azureModel) => {
  let networkGroup = {};
  let networkModules = {};

  azureModel?.modules?.forEach((item) => {
    if (item.moduleType != 'network-security-group') {
      networkModules = {
        ...networkModules,
        [item?.tfId]: { ...item }
      };
    } else {
      networkGroup = item;
    }
  });

  return {
    stack_name: azureModel?.stackName,
    networkGroup: networkGroup,
    networkModules: {
      ...networkModules
    }
  };
};