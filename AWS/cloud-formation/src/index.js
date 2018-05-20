import { findInMap, ref, sub } from 'cloudfriend'

const Parameters = {
  VpcName: {
    Type: 'String',
    AllowedValues: ['green', 'yellow'],
  },
}

const Mappings = {
  VpcMap: {
    green: {
      Cidr: '10.0.0.0/16',
      PublicSubnet1aCidr: '10.0.0.0/24',
      PublicSubnet1cCidr: '10.0.1.0/24',
      PrivateSubnet1aCidr: '10.0.4.0/24',
      PrivateSubnet1cCidr: '10.0.5.0/24',
    },
    yello: {
      Cidr: '10.1.0.0/16',
      PublicSubnet1aCidr: '10.1.0.0/24',
      PublicSubnet1cCidr: '10.1.1.0/24',
      PrivateSubnet1aCidr: '10.1.4.0/24',
      PrivateSubnet1cCidr: '10.1.5.0/24',
    },
  },
}

const Resources = {
  VPC: {
    Type: 'AWS::EC2::VPC',
    Properties: {
      CidrBlock: findInMap('VpcMap', ref('VpcName'), 'Cidr'),
      EnableDnsHostnames: true,
      Tags: [
        {
          Key: 'Name',
          Value: ref('VpcName'),
        },
      ],
    },
  },

  IGW: {
    Type: 'AWS::EC2::InternetGateway',
    Properties: {
      Tags: [
        {
          Key: 'Name',
          Value: ref('VpcName'),
        },
      ],
    },
  },

  IGWAttachment: {
    Type: 'AWS::EC2::VPCGatewayAttachment',
    Properties: {
      InternetGatewayId: ref('IGW'),
      VpcId: ref('VPC'),
    },
  },

  PublicSubnet1a: {
    Type: 'AWS::EC2::Subnet',
    Properties: {
      VpcId: ref('VPC'),
      AvailabilityZone: 'ap-northeast-1a',
      CidrBlock: findInMap('VpcMap', ref('VpcName'), 'PublicSubnet1aCidr'),
      MapPublicIpOnLaunch: true,
      Tags: [
        {
          Key: 'Name',
          Value: sub('${vpc}-public-1a', {
            vpc: ref('VpcName'),
          }),
        },
      ],
    },
  },
}

const template = {
  AWSTemplateFormatVersion: '2010-09-09',
  Parameters,
  Mappings,
  Resources,
}

const json = JSON.stringify(template, null, 2)
console.log(json)
