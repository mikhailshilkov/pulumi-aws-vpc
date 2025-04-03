# Pulumi AWS VPC Component

A Pulumi component that creates AWS VPC resources based on the popular [AWS VPC Terraform module](https://github.com/terraform-aws-modules/terraform-aws-vpc).

## Features

This component provides a comprehensive VPC solution with:

- Creation of a VPC with IPv4 and optional secondary CIDRs, plus IPv6 support (Amazon-provided or via IPAM)
- Creation of various subnet types: public, private, database, elasticache, redshift, intra, outpost
- Internet Gateway (IGW) for public subnets
- Egress-Only Internet Gateway (EIGW) for IPv6 egress from private subnets
- NAT Gateway(s) for private subnets with configurable options (single, one-per-AZ, reuse EIPs)
- Configurable DHCP Option Sets
- Network ACLs with custom rules and dedicated ACLs per subnet type
- Route tables with proper routing for IGW, EIGW, NAT Gateways, and VPN Gateways
- Subnet groups for RDS, ElastiCache, and Redshift (Note: Outputs for ElastiCache/Redshift groups are not yet implemented)
- VPC Flow Logs with CloudWatch or S3 integration and configurable IAM roles/policies
- VPN Gateway creation or attachment, with route propagation controls
- Customer Gateway configuration (Inputs available, resource creation not yet implemented)
- Default VPC resource management (VPC itself, Security Group, Network ACL, Route Table)
- Comprehensive tagging options applied across resources

## Usage

### TypeScript

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { Vpc } from "pulumi-aws-vpc";

// Get available AZs in the region
const availabilityZones = aws.getAvailabilityZones({
    state: "available",
});

// Create a new VPC using our component
const vpc = new Vpc("example-vpc", {
    name: "example-vpc",
    cidr: "10.0.0.0/16",
    azs: availabilityZones.then(azs => azs.names.slice(0, 3)),
    
    publicSubnets: {
        cidrBlocks: ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
        mapPublicIpOnLaunch: true,
    },
    
    privateSubnets: {
        cidrBlocks: ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"],
    },
    
    // Enable NAT Gateway
    natGateway: {
        enable: true,
        single: true // Use a single NAT Gateway for all private subnets
    },
    
    // Add tags to all resources
    tags: {
        Environment: "dev",
        Project: "example"
    }
});

// Export the VPC ID and subnet IDs
export const vpcId = vpc.vpcId;
export const publicSubnetIds = vpc.publicSubnets;
export const privateSubnetIds = vpc.privateSubnets;
```

### YAML

```yaml
name: yaml-vpc-example
runtime: yaml
description: A simple YAML example of the AWS VPC component

packages:
  pulumi-aws-vpc: github.com/mikhailshilkov/pulumi-aws-vpc

resources:
  availabilityZones:
    type: aws:getAvailabilityZones
    properties:
      state: available
  
  vpc:
    type: pulumi-aws-vpc:Vpc
    properties:
      name: yaml-vpc
      cidr: 10.0.0.0/16
      azs:
        - fn::slice:
            - ${availabilityZones.names}
            - 0
            - 3
      
      publicSubnets:
        cidrBlocks:
          - 10.0.1.0/24
          - 10.0.2.0/24
          - 10.0.3.0/24
        mapPublicIpOnLaunch: true
      
      privateSubnets:
        cidrBlocks:
          - 10.0.101.0/24
          - 10.0.102.0/24
          - 10.0.103.0/24
      
      # Enable NAT Gateway
      natGateway:
        enable: true
        single: true
      
      # Add tags to all resources
      tags:
        Environment: dev
        Project: yaml-example

outputs:
  vpcId: ${vpc.vpcId}
  publicSubnetIds: ${vpc.publicSubnets}
  privateSubnetIds: ${vpc.privateSubnets}
```

Other languages are similarly possible.

## Input Properties

The component accepts the following arguments (`VpcArgs`):

### Core VPC Configuration

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `name`                         | string              | **Required.** Name used as a prefix for all resources.       |                  |
| `createVpc`                    | boolean             | Whether to create the VPC resource itself.                   | `true`           |
| `cidr`                         | string              | The primary IPv4 CIDR block for the VPC.                     | `"10.0.0.0/16"`  |
| `secondaryCidrBlocks`          | string[]            | List of secondary IPv4 CIDR blocks for the VPC.              | `[]`             |
| `instanceTenancy`              | string              | A tenancy option for instances launched into the VPC.        | `"default"`      |
| `azs`                          | string[]            | **Required.** A list of availability zones in the region.    |                  |
| `enableDnsHostnames`           | boolean             | Enable DNS hostnames in the VPC.                             | `true`           |
| `enableDnsSupport`             | boolean             | Enable DNS support in the VPC.                               | `true`           |
| `enableNetworkAddressUsageMetrics` | boolean         | Enables network address usage metrics for the VPC.           | `false`          |

### IPv6 Configuration

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `enableIpv6`                   | boolean             | Requests an Amazon-provided IPv6 CIDR block if not using IPAM. | `false`          |
| `ipv6Cidr`                     | string              | An specific IPv6 CIDR block to use.                          |                  |
| `ipv6IpamPoolId`               | string              | ID of an IPv6 IPAM pool to use for allocating the VPC CIDR.  |                  |
| `ipv6NetmaskLength`            | number              | Netmask length for the IPv6 CIDR block allocated from IPAM.  |                  |
| `ipv6CidrBlockNetworkBorderGroup` | string           | The name of the location from which you advertise the IPV6 CIDR block. |                  |
| `createEgressOnlyIgw`          | boolean             | Creates an Egress-Only Internet Gateway for IPv6 traffic.    | `true` (if `enableIpv6`) |

### IPAM Configuration (IPv4)

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `useIpamPool`                  | boolean             | Whether to use an IPAM pool for the primary IPv4 CIDR.       | `false`          |
| `ipv4IpamPoolId`               | string              | ID of the IPv4 IPAM pool.                                    |                  |
| `ipv4NetmaskLength`            | number              | Netmask length for the IPv4 CIDR allocated from IPAM.        |                  |

### Tagging

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `tags`                         | object              | A map of tags to add to all resources created by the component. | `{}`             |
| `vpcTags`                      | object              | Additional tags applied only to the VPC resource.            | `{}`             |

### Subnet Configurations

See the dedicated sections below for configuring `publicSubnets`, `privateSubnets`, `databaseSubnets`, etc.

### Other Configurations

| Property                       | Type                | Description                                                                        | Default          |
|--------------------------------|---------------------|------------------------------------------------------------------------------------|------------------|
| `dhcpOptions`                  | DhcpOptionsConfiguration | Configuration for the VPC DHCP Options Set. See details below.                     | Disabled         |
| `createIgw`                    | boolean             | Whether to create an Internet Gateway for the VPC.                                   | `true`           |
| `igwTags`                      | object              | Additional tags applied only to the Internet Gateway.                                | `{}`             |
| `natGateway`                   | NatGatewayConfiguration | Configuration for NAT Gateways. See details below.                               | Disabled         |
| `enableVpnGateway`             | boolean             | Whether to create or attach a VPN Gateway.                                         | `false`          |
| `vpnGatewayId`                 | string              | ID of an existing VPN Gateway to attach to the VPC.                                |                  |
| `amazonSideAsn`                | string              | The Autonomous System Number (ASN) for the Amazon side of the gateway.             | `"64512"`        |
| `vpnGatewayAz`                 | string              | The Availability Zone for the VPN Gateway.                                         |                  |
| `propagate*RouteTablesVgw`     | boolean             | Controls route propagation from the VPN Gateway to specific route table types.     | `false`          |
| `vpnGatewayTags`               | object              | Additional tags applied only to the created VPN Gateway.                           | `{}`             |
| `customerGateways`             | object              | Configuration for Customer Gateways (currently only for tagging, not resource creation). | `{}`             |
| `customerGatewayTags`          | object              | Tags applied to Customer Gateways if configured.                                   | `{}`             |
| `flowLog`                      | FlowLogConfiguration | Configuration for VPC Flow Logs. See details below.                                | Disabled         |
| `manageDefaultVpc`             | boolean             | Whether to manage the default VPC in the account/region.                         | `false`          |
| `defaultVpc*`                  | various             | Properties to configure the managed default VPC (`defaultVpcName`, `defaultVpcTags`, etc.). |                  |
| `manageDefaultSecurityGroup`   | boolean             | Whether to manage the default Security Group for the VPC.                          | `false`          |
| `defaultSecurityGroup*`        | various             | Properties to configure the managed default Security Group.                        |                  |
| `manageDefaultNetworkAcl`      | boolean             | Whether to manage the default Network ACL for the VPC.                             | `false`          |
| `defaultNetworkAcl*`           | various             | Properties to configure the managed default Network ACL.                           |                  |
| `manageDefaultRouteTable`      | boolean             | Whether to manage the default Route Table for the VPC.                             | `false`          |
| `defaultRouteTable*`           | various             | Properties to configure the managed default Route Table.                           |                  |

**Note:** For detailed structures of `DhcpOptionsConfiguration`, `NatGatewayConfiguration`, `FlowLogConfiguration`, and the various subnet configurations, please refer to the type definitions in `index.ts` or the sections below.

## Subnet Properties

Subnets are configured via dedicated properties within `VpcArgs`, such as `publicSubnets`, `privateSubnets`, etc. Each of these properties accepts an object based on specific configuration types (e.g., `PublicSubnetConfiguration`, `PrivateSubnetConfiguration`).

### Common Subnet Configuration (`SubnetConfiguration`)

Most subnet types share these common properties:

| Property                               | Type                | Description                                                        | Default          |
|----------------------------------------|---------------------|--------------------------------------------------------------------|------------------|
| `cidrBlocks`                           | string[]            | **Required.** A list of IPv4 CIDR blocks for the subnets.           |                  |
| `ipv6Prefixes`                         | string[]            | Assigns IPv6 subnet IDs based on the VPC's /56 prefix (e.g., `["00", "01"]`). |                  |
| `assignIpv6AddressOnCreation`          | boolean             | Assign IPv6 addresses on creation.                                 | `false`          |
| `enableDns64`                          | boolean             | Enables DNS64 for the subnet.                                      | `false`          |
| `enableResourceNameDnsAaaaRecordOnLaunch` | boolean          | Respond to DNS queries for instance hostnames with AAAA records.   | `false`          |
| `enableResourceNameDnsARecordOnLaunch` | boolean             | Respond to DNS queries for instance hostnames with A records.      | `false`          |
| `ipv6Native`                           | boolean             | Creates an IPv6-only subnet. Requires `enableIpv6`.                | `false`          |
| `privateDnsHostnameTypeOnLaunch`       | string              | The type of DNS hostname to assign (`ip-name` or `resource-name`). |                  |
| `names`                                | string[]            | Explicit names for the subnets (overrides default naming).         |                  |
| `suffix`                               | string              | Suffix used in default subnet names (e.g., "public", "private").   | (Type specific)  |
| `tags`                                 | object              | Additional tags applied only to these subnets.                     | `{}`             |
| `tagsPerAz`                            | object              | Additional tags applied to subnets on a per-AZ basis.              | `{}`             |
| `routeTableTags`                       | object              | Additional tags for the route tables associated with these subnets.  | `{}`             |
| `networkAcl`                           | NetworkAclConfiguration | Configuration for a dedicated Network ACL for these subnets.     | Disabled         |

### Public Subnets (`publicSubnets`)

Accepts `PublicSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `mapPublicIpOnLaunch`          | boolean             | Map a public IP address to instances launched in the subnet. | `false`          |
| `createMultipleRouteTables`    | boolean             | Create a distinct route table per public subnet/AZ.          | `false`          |
| `suffix`                       | string              | Default name suffix.                                         | `"public"`       |

### Private Subnets (`privateSubnets`)

Accepts `PrivateSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `createNatGatewayRoute`        | boolean             | Create a route to the NAT Gateway(s) in the route table.     | `true` (if NAT enabled) |
| `suffix`                       | string              | Default name suffix.                                         | `"private"`      |

### Database Subnets (`databaseSubnets`)

Accepts `DatabaseSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `createRouteTable`             | boolean             | Create dedicated route tables for database subnets.          | `false`          |
| `createInternetGatewayRoute`   | boolean             | Add a route to the Internet Gateway (requires `createRouteTable`). | `false`          |
| `createNatGatewayRoute`        | boolean             | Add a route to the NAT Gateway(s) (requires `createRouteTable`). | `false`          |
| `createSubnetGroup`            | boolean             | Create an RDS Subnet Group from these subnets.               | `true`           |
| `subnetGroupName`              | string              | Explicit name for the RDS Subnet Group.                      | (Auto-generated) |
| `subnetGroupTags`              | object              | Additional tags for the RDS Subnet Group.                    | `{}`             |
| `suffix`                       | string              | Default name suffix.                                         | `"db"`           |

### Elasticache Subnets (`elasticacheSubnets`)

Accepts `ElasticacheSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                      | Default          |
|--------------------------------|---------------------|------------------------------------------------------------------|------------------|
| `createRouteTable`             | boolean             | Create dedicated route tables for elasticache subnets.           | `false`          |
| `createSubnetGroup`            | boolean             | Create an ElastiCache Subnet Group from these subnets.           | `true`           |
| `subnetGroupName`              | string              | Explicit name for the ElastiCache Subnet Group.                  | (Auto-generated) |
| `subnetGroupTags`              | object              | Additional tags for the ElastiCache Subnet Group.                | `{}`             |
| `suffix`                       | string              | Default name suffix.                                             | `"elasticache"`  |

### Redshift Subnets (`redshiftSubnets`)

Accepts `RedshiftSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `enablePublic`                 | boolean             | Enable public access for Redshift cluster (Not implemented). | `false`          |
| `createRouteTable`             | boolean             | Create dedicated route tables for redshift subnets.          | `false`          |
| `createSubnetGroup`            | boolean             | Create a Redshift Subnet Group from these subnets.           | `true`           |
| `subnetGroupName`              | string              | Explicit name for the Redshift Subnet Group.                 | (Auto-generated) |
| `subnetGroupTags`              | object              | Additional tags for the Redshift Subnet Group.               | `{}`             |
| `suffix`                       | string              | Default name suffix.                                         | `"redshift"`     |

### Intra Subnets (`intraSubnets`)

Accepts `IntraSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                  | Default          |
|--------------------------------|---------------------|--------------------------------------------------------------|------------------|
| `createMultipleRouteTables`    | boolean             | Create a distinct route table per intra subnet/AZ.           | `false`          |
| `suffix`                       | string              | Default name suffix.                                         | `"intra"`        |

### Outpost Subnets (`outpostSubnets`)

Accepts `OutpostSubnetConfiguration`, which includes common properties plus:

| Property                       | Type                | Description                                                      | Default          |
|--------------------------------|---------------------|------------------------------------------------------------------|------------------|
| `outpostAz`                    | string              | The specific Availability Zone name for the Outpost.             |                  |
| `customerOwnedIpv4Pool`        | string              | The customer-owned IPv4 pool for the subnet.                     |                  |
| `mapCustomerOwnedIpOnLaunch`   | boolean             | Map a customer-owned IP on launch.                               | `false`          |
| `outpostArn`                   | string              | The ARN of the Outpost the subnet is created on.                 |                  |
| `suffix`                       | string              | Default name suffix.                                             | `"outpost"`      |

### Network ACL Configuration (`NetworkAclConfiguration`)

Used within subnet configurations (`networkAcl` property).

| Property        | Type          | Description                                      | Default |
|-----------------|---------------|--------------------------------------------------|---------|
| `dedicated`     | boolean       | Whether to create a dedicated Network ACL.       | `false` |
| `inboundRules`  | NetworkAclRule[] | List of ingress rules.                           | `[]`    |
| `outboundRules` | NetworkAclRule[] | List of egress rules.                            | `[]`    |
| `tags`          | object        | Additional tags for the Network ACL.             | `{}`    |

### Network ACL Rule (`NetworkAclRule`)

| Property        | Type    | Description                        | Required |
|-----------------|---------|------------------------------------|----------|
| `ruleNumber`    | number  | Rule number (1-32766).             | Yes      |
| `ruleAction`    | string  | Action (`"allow"` or `"deny"`).    | Yes      |
| `protocol`      | string  | Protocol (`"tcp"`, `"udp"`, `"icmp"`, etc. or number). | Yes |
| `fromPort`      | number  | Start of port range (for TCP/UDP). | No       |
| `toPort`        | number  | End of port range (for TCP/UDP).   | No       |
| `cidrBlock`     | string  | IPv4 CIDR block.                   | No       |
| `ipv6CidrBlock` | string  | IPv6 CIDR block.                   | No       |

For the full list of properties and detailed structures for configurations like `NatGatewayConfiguration`, `DhcpOptionsConfiguration`, `FlowLogConfiguration`, please see the type definitions in `index.ts`.

## Outputs

| Output                     | Type                | Description                                                              |
|----------------------------|---------------------|--------------------------------------------------------------------------|
| `vpcId`                    | string              | The ID of the VPC                                                        |
| `vpcArn`                   | string              | The ARN of the VPC                                                       |
| `vpcCidrBlock`             | string              | The primary IPv4 CIDR block of the VPC                                   |
| `igwId`                    | string              | The ID of the Internet Gateway                                           |
| `igwArn`                   | string              | The ARN of the Internet Gateway                                          |
| `dhcpOptionsId`            | string              | The ID of the DHCP Options Set associated with the VPC                   |
| `natGatewayIds`            | string[]            | List of NAT Gateway IDs                                                  |
| `natPublicIps`             | string[]            | List of public Elastic IPs created for or assigned to NAT Gateways       |
| `publicSubnets`            | string[]            | List of IDs of public subnets                                            |
| `publicSubnetArns`         | string[]            | List of ARNs of public subnets                                           |
| `publicSubnetCidrBlocks`   | string[]            | List of IPv4 CIDR blocks of public subnets                               |
| `publicRouteTableIds`      | string[]            | List of IDs of public route tables                                       |
| `privateSubnets`           | string[]            | List of IDs of private subnets                                           |
| `privateSubnetArns`        | string[]            | List of ARNs of private subnets                                          |
| `privateSubnetCidrBlocks`  | string[]            | List of IPv4 CIDR blocks of private subnets                              |
| `privateRouteTableIds`     | string[]            | List of IDs of private route tables                                      |
| `databaseSubnets`          | string[]            | List of IDs of database subnets                                          |
| `databaseSubnetGroup`      | string              | ID of the created RDS database subnet group                            |
| `databaseSubnetGroupName`  | string              | Name of the created RDS database subnet group                          |
| `elasticacheSubnets`       | string[]            | List of IDs of elasticache subnets (Output TBD)                          |
| `redshiftSubnets`          | string[]            | List of IDs of redshift subnets (Output TBD)                             |
| `intraSubnets`             | string[]            | List of IDs of intra subnets (Output TBD)                                |
| `outpostSubnets`           | string[]            | List of IDs of outpost subnets (Output TBD)                              |
| `vpnGatewayId`             | string              | The ID of the VPN Gateway (either created or attached)                   |
| `flowLogId`                | string              | The ID of the VPC Flow Log                                               |

**Note:** Outputs for ElastiCache, Redshift, Intra, and Outpost subnets/subnet groups are not fully implemented yet.

For the full list of outputs, please see the source code (`registerOutputs` call in `index.ts`).

## License

Apache 2.0