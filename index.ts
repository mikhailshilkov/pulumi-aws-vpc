import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

/**
 * Type definitions for subnet configurations
 */
export interface SubnetConfiguration {
    /** CIDR blocks for subnets */
    cidrBlocks?: string[];
    /** IPv6 prefixes */
    ipv6Prefixes?: string[];
    /** Whether to assign IPv6 address on creation */
    assignIpv6AddressOnCreation?: pulumi.Input<boolean>;
    /** Whether to enable DNS64 */
    enableDns64?: pulumi.Input<boolean>;
    /** Whether to enable resource name DNS AAAA record on launch */
    enableResourceNameDnsAaaaRecordOnLaunch?: pulumi.Input<boolean>;
    /** Whether to enable resource name DNS A record on launch */
    enableResourceNameDnsARecordOnLaunch?: pulumi.Input<boolean>;
    /** IPv6 native subnet */
    ipv6Native?: pulumi.Input<boolean>;
    /** Private DNS hostname type on launch */
    privateDnsHostnameTypeOnLaunch?: pulumi.Input<string>;
    /** Explicit subnet names */
    names?: string[];
    /** Subnet suffix */
    suffix?: string;
    /** Additional subnet tags */
    tags?: {[key: string]: pulumi.Input<string>};
    /** Tags per AZ */
    tagsPerAz?: {[key: string]: {[key: string]: pulumi.Input<string>}};
    /** Route table tags */
    routeTableTags?: {[key: string]: pulumi.Input<string>};
}

/**
 * Network ACL configuration
 */
export interface NetworkAclConfiguration {
    /** Whether to use dedicated network ACL */
    dedicated?: pulumi.Input<boolean>;
    /** Inbound rules */
    inboundRules?: NetworkAclRule[];
    /** Outbound rules */
    outboundRules?: NetworkAclRule[];
    /** Network ACL tags */
    tags?: {[key: string]: pulumi.Input<string>};
}

/**
 * Network ACL rule
 */
export interface NetworkAclRule {
    /** Rule number */
    ruleNumber: number;
    /** Rule action (allow or deny) */
    ruleAction: string;
    /** From port */
    fromPort?: number;
    /** To port */
    toPort?: number;
    /** Protocol */
    protocol: string;
    /** CIDR block */
    cidrBlock?: string;
    /** IPv6 CIDR block */
    ipv6CidrBlock?: string;
}

/**
 * Specific configurations for public subnets
 */
export interface PublicSubnetConfiguration extends SubnetConfiguration {
    /** Map public IP on launch */
    mapPublicIpOnLaunch?: pulumi.Input<boolean>;
    /** Create multiple route tables */
    createMultipleRouteTables?: pulumi.Input<boolean>;
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * Specific configurations for private subnets
 */
export interface PrivateSubnetConfiguration extends SubnetConfiguration {
    /** Create NAT gateway route */
    createNatGatewayRoute?: pulumi.Input<boolean>;
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * Specific configurations for database subnets
 */
export interface DatabaseSubnetConfiguration extends SubnetConfiguration {
    /** Create route table */
    createRouteTable?: pulumi.Input<boolean>;
    /** Create internet gateway route */
    createInternetGatewayRoute?: pulumi.Input<boolean>;
    /** Create NAT gateway route */
    createNatGatewayRoute?: pulumi.Input<boolean>;
    /** Create subnet group */
    createSubnetGroup?: pulumi.Input<boolean>;
    /** Subnet group name */
    subnetGroupName?: string;
    /** Subnet group tags */
    subnetGroupTags?: { [key: string]: pulumi.Input<string> };
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * Specific configurations for elasticache subnets
 */
export interface ElasticacheSubnetConfiguration extends SubnetConfiguration {
    /** Create route table */
    createRouteTable?: pulumi.Input<boolean>;
    /** Create subnet group */
    createSubnetGroup?: pulumi.Input<boolean>;
    /** Subnet group name */
    subnetGroupName?: string;
    /** Subnet group tags */
    subnetGroupTags?: { [key: string]: pulumi.Input<string> };
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * Specific configurations for redshift subnets
 */
export interface RedshiftSubnetConfiguration extends SubnetConfiguration {
    /** Enable public access */
    enablePublic?: pulumi.Input<boolean>;
    /** Create route table */
    createRouteTable?: pulumi.Input<boolean>;
    /** Create subnet group */
    createSubnetGroup?: pulumi.Input<boolean>;
    /** Subnet group name */
    subnetGroupName?: string;
    /** Subnet group tags */
    subnetGroupTags?: { [key: string]: pulumi.Input<string> };
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * Specific configurations for intra subnets
 */
export interface IntraSubnetConfiguration extends SubnetConfiguration {
    /** Create multiple route tables */
    createMultipleRouteTables?: pulumi.Input<boolean>;
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * Specific configurations for outpost subnets
 */
export interface OutpostSubnetConfiguration extends SubnetConfiguration {
    /** Outpost availability zone */
    outpostAz?: string;
    /** Customer owned IPv4 pool */
    customerOwnedIpv4Pool?: string;
    /** Map customer owned IP on launch */
    mapCustomerOwnedIpOnLaunch?: pulumi.Input<boolean>;
    /** Outpost ARN */
    outpostArn?: string;
    /** Network ACL configuration */
    networkAcl?: NetworkAclConfiguration;
}

/**
 * NAT Gateway configuration
 */
export interface NatGatewayConfiguration {
    /** Enable NAT Gateway */
    enable: pulumi.Input<boolean>;
    /** Single NAT Gateway for all subnets */
    single?: pulumi.Input<boolean>;
    /** One NAT Gateway per AZ */
    onePerAz?: pulumi.Input<boolean>;
    /** Destination CIDR block */
    destinationCidrBlock?: string;
    /** Reuse existing Elastic IPs */
    reuseEips?: pulumi.Input<boolean>;
    /** External NAT IP IDs */
    externalNatIpIds?: pulumi.Input<string[]>;
    /** External NAT IPs */
    externalNatIps?: pulumi.Input<string[]>;
    /** NAT Gateway tags */
    tags?: {[key: string]: pulumi.Input<string>};
    /** NAT EIP tags */
    eipTags?: {[key: string]: pulumi.Input<string>};
}

/**
 * DHCP options configuration
 */
export interface DhcpOptionsConfiguration {
    /** Enable DHCP options */
    enable: pulumi.Input<boolean>;
    /** Domain name */
    domainName?: pulumi.Input<string>;
    /** Domain name servers */
    domainNameServers?: pulumi.Input<string[]>;
    /** NTP servers */
    ntpServers?: pulumi.Input<string[]>;
    /** NetBIOS name servers */
    netbiosNameServers?: pulumi.Input<string[]>;
    /** NetBIOS node type */
    netbiosNodeType?: pulumi.Input<string>;
    /** IPv6 address preferred lease time */
    ipv6AddressPreferredLeaseTime?: pulumi.Input<number>;
    /** DHCP options tags */
    tags?: {[key: string]: pulumi.Input<string>};
}

/**
 * CloudWatch configuration for flow logs
 */
export interface CloudWatchConfiguration {
    /** Create log group */
    createLogGroup?: pulumi.Input<boolean>;
    /** Create IAM role */
    createIamRole?: pulumi.Input<boolean>;
    /** IAM role conditions */
    iamRoleConditions?: pulumi.Input<any[]>;
    /** IAM role ARN */
    iamRoleArn?: pulumi.Input<string>;
    /** Log group name prefix */
    logGroupNamePrefix?: pulumi.Input<string>;
    /** Log group name suffix */
    logGroupNameSuffix?: pulumi.Input<string>;
    /** Retention in days */
    retentionInDays?: pulumi.Input<number>;
    /** KMS key ID */
    kmsKeyId?: pulumi.Input<string>;
    /** Skip destroy */
    skipDestroy?: pulumi.Input<boolean>;
    /** Log group class */
    logGroupClass?: pulumi.Input<string>;
}

/**
 * Flow log configuration
 */
export interface FlowLogConfiguration {
    /** Enable flow log */
    enable?: pulumi.Input<boolean>;
    /** IAM role name */
    iamRoleName?: pulumi.Input<string>;
    /** Use IAM role name prefix */
    iamRoleUseNamePrefix?: pulumi.Input<boolean>;
    /** Permissions boundary */
    permissionsBoundary?: pulumi.Input<string>;
    /** IAM policy name */
    iamPolicyName?: pulumi.Input<string>;
    /** Use IAM policy name prefix */
    iamPolicyUseNamePrefix?: pulumi.Input<boolean>;
    /** Max aggregation interval */
    maxAggregationInterval?: pulumi.Input<number>;
    /** Traffic type */
    trafficType?: pulumi.Input<string>;
    /** Destination type */
    destinationType?: pulumi.Input<string>;
    /** Log format */
    logFormat?: pulumi.Input<string>;
    /** Destination ARN */
    destinationArn?: pulumi.Input<string>;
    /** Deliver cross account role */
    deliverCrossAccountRole?: pulumi.Input<string>;
    /** File format */
    fileFormat?: pulumi.Input<string>;
    /** Hive compatible partitions */
    hiveCompatiblePartitions?: pulumi.Input<boolean>;
    /** Per hour partition */
    perHourPartition?: pulumi.Input<boolean>;
    /** Tags */
    tags?: { [key: string]: pulumi.Input<string> };
    /** CloudWatch configuration */
    cloudWatch?: CloudWatchConfiguration;
}

/**
 * VPC configuration for the component
 */
export interface VpcArgs {
    /** Name to be used on all the resources as identifier */
    name: string;
    /** Whether to create VPC */
    createVpc: boolean;//TODO make it optional again
    /** The IPv4 CIDR block for the VPC */
    cidr?: pulumi.Input<string>;
    /** Secondary CIDR blocks */
    secondaryCidrBlocks?: pulumi.Input<string[]>;
    /** Instance tenancy */
    instanceTenancy?: pulumi.Input<string>;
    /** List of availability zones */
    azs: pulumi.Input<string[]>;
    /** Enable DNS hostnames */
    enableDnsHostnames?: pulumi.Input<boolean>;
    /** Enable DNS support */
    enableDnsSupport?: pulumi.Input<boolean>;
    /** Enable network address usage metrics */
    enableNetworkAddressUsageMetrics?: pulumi.Input<boolean>;
    /** Use IPAM pool */
    useIpamPool?: pulumi.Input<boolean>;
    /** IPv4 IPAM pool ID */
    ipv4IpamPoolId?: pulumi.Input<string>;
    /** IPv4 netmask length */
    ipv4NetmaskLength?: pulumi.Input<number>;
    /** Enable IPv6 */
    enableIpv6?: pulumi.Input<boolean>;
    /** IPv6 CIDR block */
    ipv6Cidr?: pulumi.Input<string>;
    /** IPv6 IPAM pool ID */
    ipv6IpamPoolId?: pulumi.Input<string>;
    /** IPv6 netmask length */
    ipv6NetmaskLength?: pulumi.Input<number>;
    /** IPv6 CIDR block network border group */
    ipv6CidrBlockNetworkBorderGroup?: pulumi.Input<string>;
    /** VPC tags */
    vpcTags?: {[key: string]: pulumi.Input<string>};
    /** Global tags to be applied to all resources */
    tags?: {[key: string]: pulumi.Input<string>};
    /** VPC block public access options */
    vpcBlockPublicAccessOptions?: {[key: string]: pulumi.Input<string>};
    /** VPC block public access exclusions */
    vpcBlockPublicAccessExclusions?: {[key: string]: any};
    
    /** DHCP options configuration */
    dhcpOptions?: DhcpOptionsConfiguration;
    
    /** Public subnets configuration */
    publicSubnets?: PublicSubnetConfiguration;
    /** Private subnets configuration */
    privateSubnets?: PrivateSubnetConfiguration;
    /** Database subnets configuration */
    databaseSubnets?: DatabaseSubnetConfiguration;
    /** Elasticache subnets configuration */
    elasticacheSubnets?: ElasticacheSubnetConfiguration;
    /** Redshift subnets configuration */
    redshiftSubnets?: RedshiftSubnetConfiguration;
    /** Intra subnets configuration */
    intraSubnets?: IntraSubnetConfiguration;
    /** Outpost subnets configuration */
    outpostSubnets?: OutpostSubnetConfiguration;
    
    /** Create internet gateway */
    createIgw?: pulumi.Input<boolean>;
    /** Create egress only internet gateway */
    createEgressOnlyIgw?: pulumi.Input<boolean>;
    /** Internet gateway tags */
    igwTags?: { [key: string]: pulumi.Input<string> };
    
    /** NAT Gateway configuration */
    natGateway?: NatGatewayConfiguration;
    
    /** Customer gateways */
    customerGateways?: { [key: string]: any };
    /** Customer gateway tags */
    customerGatewayTags?: { [key: string]: pulumi.Input<string> };
    
    /** Enable VPN gateway */
    enableVpnGateway?: pulumi.Input<boolean>;
    /** VPN gateway ID */
    vpnGatewayId?: string;
    /** Amazon side ASN */
    amazonSideAsn?: string;
    /** VPN gateway AZ */
    vpnGatewayAz?: string;
    /** Propagate intra route tables VGW */
    propagateIntraRouteTablesVgw?: pulumi.Input<boolean>;
    /** Propagate private route tables VGW */
    propagatePrivateRouteTablesVgw?: pulumi.Input<boolean>;
    /** Propagate public route tables VGW */
    propagatePublicRouteTablesVgw?: pulumi.Input<boolean>;
    /** VPN gateway tags */
    vpnGatewayTags?: { [key: string]: pulumi.Input<string> };
    
    /** Manage default VPC */
    manageDefaultVpc?: pulumi.Input<boolean>;
    /** Default VPC name */
    defaultVpcName?: string;
    /** Default VPC enable DNS support */
    defaultVpcEnableDnsSupport?: pulumi.Input<boolean>;
    /** Default VPC enable DNS hostnames */
    defaultVpcEnableDnsHostnames?: pulumi.Input<boolean>;
    /** Default VPC tags */
    defaultVpcTags?: { [key: string]: pulumi.Input<string> };
    /** Manage default security group */
    manageDefaultSecurityGroup?: pulumi.Input<boolean>;
    /** Default security group name */
    defaultSecurityGroupName?: string;
    /** Default security group ingress rules */
    defaultSecurityGroupIngress?: any[];
    /** Default security group egress rules */
    defaultSecurityGroupEgress?: any[];
    /** Default security group tags */
    defaultSecurityGroupTags?: { [key: string]: pulumi.Input<string> };
    
    /** Manage default network ACL */
    manageDefaultNetworkAcl?: pulumi.Input<boolean>;
    /** Default network ACL name */
    defaultNetworkAclName?: string;
    /** Default network ACL ingress rules */
    defaultNetworkAclIngress?: any[];
    /** Default network ACL egress rules */
    defaultNetworkAclEgress?: any[];
    /** Default network ACL tags */
    defaultNetworkAclTags?: { [key: string]: pulumi.Input<string> };
    
    /** Manage default route table */
    manageDefaultRouteTable?: pulumi.Input<boolean>;
    /** Default route table name */
    defaultRouteTableName?: string;
    /** Default route table propagating VGWs */
    defaultRouteTablePropagatingVgws?: string[];
    /** Default route table routes */
    defaultRouteTableRoutes?: any[];
    /** Default route table tags */
    defaultRouteTableTags?: { [key: string]: pulumi.Input<string> };
    
    /** Flow log configuration */
    flowLog?: FlowLogConfiguration;
}

/**
 * A component resource for creating a Virtual Private Cloud (VPC) in AWS.
 */
export class Vpc extends pulumi.ComponentResource {
    /**
     * The ID of the VPC
     */
    public readonly vpcId: pulumi.Output<string>;
    
    /**
     * The ARN of the VPC
     */
    public readonly vpcArn: pulumi.Output<string>;
    
    /**
     * The CIDR block of the VPC
     */
    public readonly vpcCidrBlock: pulumi.Output<string>;
    
    /**
     * The ID of the Internet Gateway
     */
    public readonly igwId?: pulumi.Output<string>;
    
    /**
     * The ARN of the Internet Gateway
     */
    public readonly igwArn?: pulumi.Output<string>;
    
    /**
     * List of IDs of public subnets
     */
    public readonly publicSubnets?: pulumi.Output<string[]>;
    
    /**
     * List of ARNs of public subnets
     */
    public readonly publicSubnetArns?: pulumi.Output<string[]>;
    
    /**
     * List of CIDR blocks of public subnets
     */
    public readonly publicSubnetCidrBlocks?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of private subnets
     */
    public readonly privateSubnets?: pulumi.Output<string[]>;
    
    /**
     * List of ARNs of private subnets
     */
    public readonly privateSubnetArns?: pulumi.Output<string[]>;
    
    /**
     * List of CIDR blocks of private subnets
     */
    public readonly privateSubnetCidrBlocks?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of public route tables
     */
    public readonly publicRouteTableIds?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of private route tables
     */
    public readonly privateRouteTableIds?: pulumi.Output<string[]>;
    
    /**
     * List of NAT Gateway IDs
     */
    public readonly natGatewayIds?: pulumi.Output<string[]>;
    
    /**
     * List of public Elastic IPs created for AWS NAT Gateway
     */
    public readonly natPublicIps?: pulumi.Output<string[]>;
    
    /**
     * ID of the DHCP options
     */
    public readonly dhcpOptionsId?: pulumi.Output<string>;
    
    /**
     * ID of the database subnet group
     */
    public readonly databaseSubnetGroup?: pulumi.Output<string>;
    
    /**
     * Name of the database subnet group
     */
    public readonly databaseSubnetGroupName?: pulumi.Output<string>;
    
    /**
     * List of IDs of database subnets
     */
    public readonly databaseSubnets?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of elasticache subnets
     */
    public readonly elasticacheSubnets?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of redshift subnets
     */
    public readonly redshiftSubnets?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of intra subnets
     */
    public readonly intraSubnets?: pulumi.Output<string[]>;
    
    /**
     * List of IDs of outpost subnets
     */
    public readonly outpostSubnets?: pulumi.Output<string[]>;
    
    /**
     * The ID of the VPN Gateway
     */
    public readonly vpnGatewayId?: pulumi.Output<string>;
    
    /**
     * The ID of the Flow Log
     */
    public readonly flowLogId?: pulumi.Output<string>;
    
    constructor(name: string, args: VpcArgs, opts?: pulumi.ComponentResourceOptions) {
        super("aws-vpc:index:Vpc", name, args, opts);
        
        // Default values
        const createVpc = args.createVpc !== false;
        
        // Create VPC
        const vpc = createVpc ? new aws.ec2.Vpc(name, {
            cidrBlock: args.cidr || "10.0.0.0/16",
            instanceTenancy: args.instanceTenancy || "default",
            enableDnsHostnames: args.enableDnsHostnames !== false,
            enableDnsSupport: args.enableDnsSupport !== false,
            enableNetworkAddressUsageMetrics: args.enableNetworkAddressUsageMetrics,
            ipv4IpamPoolId: args.ipv4IpamPoolId,
            ipv4NetmaskLength: args.ipv4NetmaskLength,
            assignGeneratedIpv6CidrBlock: args.enableIpv6 && !args.useIpamPool ? true : undefined,
            ipv6CidrBlock: args.ipv6Cidr,
            ipv6IpamPoolId: args.ipv6IpamPoolId,
            ipv6NetmaskLength: args.ipv6NetmaskLength,
            ipv6CidrBlockNetworkBorderGroup: args.ipv6CidrBlockNetworkBorderGroup,
            tags: {
                Name: args.name,
                ...args.tags,
                ...args.vpcTags,
            },
        }, { parent: this }) : undefined;
        
        this.vpcId = vpc?.id || pulumi.output("");
        this.vpcArn = vpc?.arn || pulumi.output("");
        this.vpcCidrBlock = vpc?.cidrBlock || pulumi.output("");
        
        // VPC Secondary CIDR blocks
        if (createVpc && args.secondaryCidrBlocks) {
            pulumi.all([args.secondaryCidrBlocks]).apply(([cidrBlocks]) => {
                if (cidrBlocks.length > 0) {
                    for (let i = 0; i < cidrBlocks.length; i++) {
                        new aws.ec2.VpcIpv4CidrBlockAssociation(`${name}-secondary-cidr-${i}`, {
                            vpcId: vpc!.id,
                            cidrBlock: cidrBlocks[i],
                        }, { parent: vpc });
                    }
                }
            });
        }
        
        // DHCP Options
        let dhcpOptions: aws.ec2.VpcDhcpOptions | undefined;
        if (createVpc && args.dhcpOptions?.enable) {
            dhcpOptions = new aws.ec2.VpcDhcpOptions(`${name}-dhcp`, {
                domainName: args.dhcpOptions.domainName,
                domainNameServers: args.dhcpOptions.domainNameServers || ["AmazonProvidedDNS"],
                ntpServers: args.dhcpOptions.ntpServers,
                netbiosNameServers: args.dhcpOptions.netbiosNameServers,
                netbiosNodeType: args.dhcpOptions.netbiosNodeType,
                // Convert number to string for ipv6AddressPreferredLeaseTime
                ipv6AddressPreferredLeaseTime: args.dhcpOptions.ipv6AddressPreferredLeaseTime !== undefined 
                    ? args.dhcpOptions.ipv6AddressPreferredLeaseTime.toString() 
                    : undefined,
                tags: {
                    Name: args.name,
                    ...args.tags,
                    ...args.dhcpOptions.tags,
                },
            }, { parent: vpc });
            
            new aws.ec2.VpcDhcpOptionsAssociation(`${name}-dhcp-assoc`, {
                vpcId: vpc!.id,
                dhcpOptionsId: dhcpOptions.id,
            }, { parent: vpc });
        }
        
        this.dhcpOptionsId = dhcpOptions?.id;
        
        // Internet Gateway
        let internetGateway: aws.ec2.InternetGateway | undefined;
        if (createVpc && args.createIgw !== false) {
            internetGateway = new aws.ec2.InternetGateway(`${name}-igw`, {
                vpcId: vpc!.id,
                tags: {
                    Name: args.name,
                    ...args.tags,
                    ...args.igwTags,
                },
            }, { parent: vpc });
        }
        
        this.igwId = internetGateway?.id;
        this.igwArn = internetGateway?.arn;
        
        // Egress Only Internet Gateway
        let egressOnlyInternetGateway: aws.ec2.EgressOnlyInternetGateway | undefined;
        if (createVpc && args.createEgressOnlyIgw !== false && args.enableIpv6) {
            egressOnlyInternetGateway = new aws.ec2.EgressOnlyInternetGateway(`${name}-eigw`, {
                vpcId: vpc!.id,
            }, { parent: vpc });
        }
        
        // Public subnets
        let publicSubnets: aws.ec2.Subnet[] = [];
        let publicRouteTables: aws.ec2.RouteTable[] = [];
        
        if (createVpc && args.publicSubnets?.cidrBlocks && args.publicSubnets.cidrBlocks.length > 0) {
            const numPublicRouteTables = args.publicSubnets.createMultipleRouteTables 
                ? args.publicSubnets.cidrBlocks.length 
                : 1;
            
            // Create route tables first
            for (let i = 0; i < numPublicRouteTables; i++) {
                // Get AZ for route table name if needed
                const rtAz = pulumi.output(args.azs).apply(azs => azs[i % azs.length]);
                
                const rtName = pulumi.all([rtAz, args.publicSubnets.createMultipleRouteTables || false])
                    .apply(([az, createMultiple]) => 
                        createMultiple 
                            ? `${args.name}-${args.publicSubnets!.suffix || "public"}-${az}`
                            : `${args.name}-${args.publicSubnets!.suffix || "public"}`
                    );
                
                const rt = new aws.ec2.RouteTable(`${name}-public-rt-${i}`, {
                    vpcId: vpc!.id,
                    tags: pulumi.all([rtName]).apply(([name]) => ({
                        Name: name,
                        ...args.tags,
                        ...args.publicSubnets!.routeTableTags,
                    })),
                }, { parent: vpc });
                
                publicRouteTables.push(rt);
                
                // Add routes
                if (internetGateway) {
                    new aws.ec2.Route(`${name}-public-route-igw-${i}`, {
                        routeTableId: rt.id,
                        destinationCidrBlock: "0.0.0.0/0",
                        gatewayId: internetGateway.id,
                    }, { parent: rt });
                    
                    if (args.enableIpv6) {
                        new aws.ec2.Route(`${name}-public-route-igw-ipv6-${i}`, {
                            routeTableId: rt.id,
                            destinationIpv6CidrBlock: "::/0",
                            gatewayId: internetGateway.id,
                        }, { parent: rt });
                    }
                }
            }
            
            // Create subnets
            for (let i = 0; i < args.publicSubnets.cidrBlocks.length; i++) {
                // Calculate AZ index in a safe way
                const azIndex = pulumi.output(args.azs).apply(azs => i % azs.length);
                
                // Create a pulumi.Output for the AZ based on the azIndex
                const az = pulumi.output(args.azs).apply(azs => {
                    const index = i % azs.length;
                    return azs[index];
                });
                
                const subnetName = pulumi.all([az, args.publicSubnets?.names?.[i] || ""]).apply(([currentAz, explicitName]) => {
                    return explicitName || `${args.name}-${args.publicSubnets?.suffix || "public"}-${currentAz}`;
                });
                
                let subnetArgs: aws.ec2.SubnetArgs = {
                    vpcId: vpc!.id,
                    cidrBlock: args.publicSubnets.ipv6Native ? undefined : args.publicSubnets.cidrBlocks[i],
                    availabilityZone: az,
                    mapPublicIpOnLaunch: args.publicSubnets.mapPublicIpOnLaunch || false,
                    assignIpv6AddressOnCreation: args.enableIpv6 && args.publicSubnets.ipv6Native 
                        ? true 
                        : args.publicSubnets.assignIpv6AddressOnCreation || false,
                    enableDns64: args.enableIpv6 && args.publicSubnets.enableDns64,
                    enableResourceNameDnsAaaaRecordOnLaunch: args.enableIpv6 && args.publicSubnets.enableResourceNameDnsAaaaRecordOnLaunch,
                    enableResourceNameDnsARecordOnLaunch: !args.publicSubnets.ipv6Native && args.publicSubnets.enableResourceNameDnsARecordOnLaunch,
                    privateDnsHostnameTypeOnLaunch: args.publicSubnets.privateDnsHostnameTypeOnLaunch,
                    tags: pulumi.all([subnetName, az]).apply(([name, currentAz]) => ({
                        Name: name,
                        ...args.tags,
                        ...args.publicSubnets?.tags,
                        ...(args.publicSubnets?.tagsPerAz && args.publicSubnets.tagsPerAz[currentAz] || {}),
                    })),
                };
                
                // Handle IPv6 CIDR block separately since it requires a more complex lookup
                if (args.enableIpv6 && args.publicSubnets.ipv6Prefixes && args.publicSubnets.ipv6Prefixes[i]) {
                    if (vpc && vpc.ipv6CidrBlock) {
                        const prefix = args.publicSubnets.ipv6Prefixes[i];
                        subnetArgs.ipv6CidrBlock = vpc.ipv6CidrBlock.apply(cidr => {
                            if (!cidr) return undefined;
                            const base = cidr.substring(0, cidr.lastIndexOf('/'));
                            const prefixLen = parseInt(cidr.substring(cidr.lastIndexOf('/') + 1)) + 8;
                            return `${base}/${prefixLen}:${prefix}::/64`;
                        }) as pulumi.Input<string>;
                    }
                }
                
                // Set IPv6 native if specified
                if (args.enableIpv6 && args.publicSubnets.ipv6Native) {
                    subnetArgs.ipv6Native = true;
                }
                
                const subnet = new aws.ec2.Subnet(`${name}-public-${i}`, subnetArgs, { parent: vpc });
                publicSubnets.push(subnet);
                
                // Associate with route table
                const rtIndex = args.publicSubnets.createMultipleRouteTables ? i : 0;
                const rt = publicRouteTables[rtIndex % publicRouteTables.length];
                new aws.ec2.RouteTableAssociation(`${name}-public-rta-${i}`, {
                    subnetId: subnet.id,
                    routeTableId: rt.id,
                }, { parent: vpc });
            }
            
            // Create dedicated network ACL if specified
            if (args.publicSubnets.networkAcl?.dedicated) {
                const nacl = new aws.ec2.NetworkAcl(`${name}-public-nacl`, {
                    vpcId: vpc!.id,
                    subnetIds: publicSubnets.map(s => s.id),
                    tags: {
                        Name: `${args.name}-${args.publicSubnets.suffix || "public"}`,
                        ...args.tags,
                        ...args.publicSubnets.networkAcl.tags,
                    },
                }, { parent: vpc });
                
                // Ingress rules
                if (args.publicSubnets.networkAcl.inboundRules) {
                    for (let i = 0; i < args.publicSubnets.networkAcl.inboundRules.length; i++) {
                        const rule = args.publicSubnets.networkAcl.inboundRules[i];
                        new aws.ec2.NetworkAclRule(`${name}-public-nacl-ingress-${i}`, {
                            networkAclId: nacl.id,
                            ruleNumber: rule.ruleNumber,
                            egress: false,
                            protocol: rule.protocol,
                            ruleAction: rule.ruleAction,
                            cidrBlock: rule.cidrBlock,
                            ipv6CidrBlock: rule.ipv6CidrBlock,
                            fromPort: rule.fromPort,
                            toPort: rule.toPort,
                        }, { parent: nacl });
                    }
                }
                
                // Egress rules
                if (args.publicSubnets.networkAcl.outboundRules) {
                    for (let i = 0; i < args.publicSubnets.networkAcl.outboundRules.length; i++) {
                        const rule = args.publicSubnets.networkAcl.outboundRules[i];
                        new aws.ec2.NetworkAclRule(`${name}-public-nacl-egress-${i}`, {
                            networkAclId: nacl.id,
                            ruleNumber: rule.ruleNumber,
                            egress: true,
                            protocol: rule.protocol,
                            ruleAction: rule.ruleAction,
                            cidrBlock: rule.cidrBlock,
                            ipv6CidrBlock: rule.ipv6CidrBlock,
                            fromPort: rule.fromPort,
                            toPort: rule.toPort,
                        }, { parent: nacl });
                    }
                }
            }
        }
        
        // NAT Gateways
        let natGateways: aws.ec2.NatGateway[] = [];
        let natElasticIps: aws.ec2.Eip[] = [];
        let natPublicIps: pulumi.Output<string>[] = [];
        
        if (createVpc && args.natGateway?.enable && publicSubnets.length > 0 && args.privateSubnets?.cidrBlocks && args.privateSubnets.cidrBlocks.length > 0) {
            let numNatGateways = 1; // default to single NAT gateway
            
            if (args.natGateway.onePerAz) {
                // Let a number be computed from an Output
                const outputLength = pulumi.output(args.azs).apply(azs => azs.length);
                // Convert computed length to a number later
                outputLength.apply(length => numNatGateways = length);
            } else if (!args.natGateway.single && args.privateSubnets && args.privateSubnets.cidrBlocks) {
                numNatGateways = args.privateSubnets.cidrBlocks.length;
            }
            
            // Determine if we should use external IPs
            const hasExternalIps = pulumi.all([
                args.natGateway.reuseEips || false,
                args.natGateway.externalNatIpIds || []
            ]).apply(([reuse, externalIds]) => {
                return reuse && externalIds.length > 0;
            });
            
            // Convert numNatGateways to a pulumi.Output that we can use
            const natGatewayCount = pulumi.output(numNatGateways);
            
            // Create NAT gateways
            pulumi.all([natGatewayCount, hasExternalIps]).apply(([count, useExternalIps]) => {
                for (let i = 0; i < count; i++) {
                    let eip: aws.ec2.Eip | undefined;
                    let eipAllocationId: pulumi.Output<string>;
                    
                    if (useExternalIps) {
                        // Safely access and index the array
                        pulumi.all([args.natGateway?.externalNatIpIds || []]).apply(([externalIds]) => {
                            const index = i % externalIds.length;
                            eipAllocationId = pulumi.output(externalIds[index]);
                            
                            // Get external NAT IPs if available
                            if (args.natGateway?.externalNatIps) {
                                pulumi.all([args.natGateway.externalNatIps]).apply(([natIps]) => {
                                    if (i < natIps.length) {
                                        natPublicIps.push(pulumi.output(natIps[i]));
                                    }
                                });
                            }
                            
                            // Create NAT gateway using the allocation ID
                            createNatGatewayWithEip(i, eipAllocationId);
                        });
                    } else {
                        eip = new aws.ec2.Eip(`${name}-nat-eip-${i}`, {
                            domain: "vpc",
                            tags: {
                                Name: `${args.name}-nat-${i}`,
                                ...args.tags,
                                ...args.natGateway?.eipTags,
                            },
                        }, { parent: this });
                        eipAllocationId = eip.id;
                        natElasticIps.push(eip);
                        natPublicIps.push(eip.publicIp);
                        
                        // Create NAT gateway with new EIP
                        createNatGatewayWithEip(i, eipAllocationId);
                    }
                }
            });
            
            // Helper function to create a NAT Gateway with a given allocation ID
            const createNatGatewayWithEip = (index: number, allocationId: pulumi.Output<string>) => {
                // Determine subnet index based on configuration
                const subnetIndex = pulumi.all([
                    args.natGateway?.onePerAz || false,
                    index,
                    publicSubnets.length,
                    args.azs
                ]).apply(([onePerAz, natIndex, subnetCount, azs]) => {
                    if (onePerAz) {
                        return natIndex % subnetCount;
                    } else {
                        // For single or multiple NAT gateways
                        return Math.floor(natIndex / azs.length) % subnetCount;
                    }
                });
                
                // Create NAT gateway using the determined subnet
                // Get the public subnet for this NAT gateway
                const publicSubnet = pulumi.output(subnetIndex).apply(index => publicSubnets[index]);
                
                const natGw = new aws.ec2.NatGateway(`${name}-natgw-${index}`, {
                    allocationId: allocationId,
                    subnetId: publicSubnet.id,
                    tags: {
                        Name: `${args.name}-nat-${index}`,
                        ...args.tags,
                        ...args.natGateway?.tags,
                    },
                }, { parent: vpc });
                
                natGateways.push(natGw);
            };
        }
        
        // Private subnets
        let privateSubnets: aws.ec2.Subnet[] = [];
        let privateRouteTables: aws.ec2.RouteTable[] = [];
        
        if (createVpc && args.privateSubnets?.cidrBlocks && args.privateSubnets.cidrBlocks.length > 0) {
            // Create route tables and subnets for each private subnet
            for (let i = 0; i < args.privateSubnets.cidrBlocks.length; i++) {
                // Calculate AZ index and get AZ
                // Calculate AZ index in a safe way
                const azIndex = pulumi.output(args.azs).apply(azs => i % azs.length);
                const az = pulumi.output(args.azs).apply(azs => {
                    const index = i % azs.length;
                    return azs[index];
                });
                
                // Create a subnet name
                const subnetName = pulumi.all([az, args.privateSubnets?.names?.[i] || ""]).apply(([currentAz, explicitName]) => {
                    return explicitName || `${args.name}-${args.privateSubnets?.suffix || "private"}-${currentAz}`;
                });
                
                // Create a route table
                const rt = new aws.ec2.RouteTable(`${name}-private-rt-${i}`, {
                    vpcId: vpc!.id,
                    tags: pulumi.all([az]).apply(([currentAz]) => ({
                        Name: `${args.name}-${args.privateSubnets?.suffix || "private"}-${currentAz}`,
                        ...args.tags,
                        ...args.privateSubnets?.routeTableTags,
                    })),
                }, { parent: vpc });
                
                privateRouteTables.push(rt);
                
                // Add NAT Gateway route if applicable
                if (natGateways.length > 0 && args.privateSubnets.createNatGatewayRoute !== false) {
                    // Determine NAT gateway index based on configuration
                    const natGwIndex = pulumi.all([
                        args.natGateway?.onePerAz || false, 
                        args.natGateway?.single || false,
                        azIndex,
                        i,
                        natGateways.length
                    ]).apply(([onePerAz, single, currentAzIndex, subnetIndex, natCount]) => {
                        if (onePerAz) {
                            return currentAzIndex % natCount;
                        } else if (single) {
                            return 0;
                        } else {
                            return subnetIndex % natCount;
                        }
                    });
                    
                    // Create route to NAT gateway
                    new aws.ec2.Route(`${name}-private-route-natgw-${i}`, {
                        routeTableId: rt.id,
                        destinationCidrBlock: args.natGateway?.destinationCidrBlock || "0.0.0.0/0",
                        natGatewayId: pulumi.output(natGwIndex).apply(index => natGateways[index].id),
                    }, { parent: rt });
                }
                
                // Add IPv6 egress route if applicable
                if (args.enableIpv6 && egressOnlyInternetGateway) {
                    new aws.ec2.Route(`${name}-private-route-eigw-${i}`, {
                        routeTableId: rt.id,
                        destinationIpv6CidrBlock: "::/0",
                        egressOnlyGatewayId: egressOnlyInternetGateway.id,
                    }, { parent: rt });
                }
                
                // Create subnet
                let subnetArgs: aws.ec2.SubnetArgs = {
                    vpcId: vpc!.id,
                    cidrBlock: args.privateSubnets.ipv6Native ? undefined : args.privateSubnets.cidrBlocks[i],
                    availabilityZone: az,
                    assignIpv6AddressOnCreation: args.enableIpv6 && args.privateSubnets.ipv6Native 
                        ? true 
                        : args.privateSubnets.assignIpv6AddressOnCreation || false,
                    enableDns64: args.enableIpv6 && args.privateSubnets.enableDns64,
                    enableResourceNameDnsAaaaRecordOnLaunch: args.enableIpv6 && args.privateSubnets.enableResourceNameDnsAaaaRecordOnLaunch,
                    enableResourceNameDnsARecordOnLaunch: !args.privateSubnets.ipv6Native && args.privateSubnets.enableResourceNameDnsARecordOnLaunch,
                    privateDnsHostnameTypeOnLaunch: args.privateSubnets.privateDnsHostnameTypeOnLaunch,
                    tags: pulumi.all([subnetName, az]).apply(([name, currentAz]) => ({
                        Name: name,
                        ...args.tags,
                        ...args.privateSubnets?.tags,
                        ...(args.privateSubnets?.tagsPerAz && args.privateSubnets.tagsPerAz[currentAz] || {}),
                    })),
                };
                
                // Handle IPv6 CIDR block separately
                if (args.enableIpv6 && args.privateSubnets.ipv6Prefixes && args.privateSubnets.ipv6Prefixes[i]) {
                    if (vpc && vpc.ipv6CidrBlock) {
                        const prefix = args.privateSubnets.ipv6Prefixes[i];
                        subnetArgs.ipv6CidrBlock = vpc.ipv6CidrBlock.apply(cidr => {
                            if (!cidr) return undefined;
                            const base = cidr.substring(0, cidr.lastIndexOf('/'));
                            const prefixLen = parseInt(cidr.substring(cidr.lastIndexOf('/') + 1)) + 8;
                            return `${base}/${prefixLen}:${prefix}::/64`;
                        }) as pulumi.Input<string>;
                    }
                }
                
                // Set IPv6 native if specified
                if (args.enableIpv6 && args.privateSubnets.ipv6Native) {
                    subnetArgs.ipv6Native = true;
                }
                
                const subnet = new aws.ec2.Subnet(`${name}-private-${i}`, subnetArgs, { parent: vpc });
                privateSubnets.push(subnet);
                
                // Associate with route table
                new aws.ec2.RouteTableAssociation(`${name}-private-rta-${i}`, {
                    subnetId: subnet.id,
                    routeTableId: rt.id,
                }, { parent: vpc });
            }
            
            // Create dedicated network ACL if specified
            if (args.privateSubnets.networkAcl?.dedicated) {
                const nacl = new aws.ec2.NetworkAcl(`${name}-private-nacl`, {
                    vpcId: vpc!.id,
                    subnetIds: privateSubnets.map(s => s.id),
                    tags: {
                        Name: `${args.name}-${args.privateSubnets.suffix || "private"}`,
                        ...args.tags,
                        ...args.privateSubnets.networkAcl.tags,
                    },
                }, { parent: vpc });
                
                // Ingress rules
                if (args.privateSubnets.networkAcl.inboundRules) {
                    for (let i = 0; i < args.privateSubnets.networkAcl.inboundRules.length; i++) {
                        const rule = args.privateSubnets.networkAcl.inboundRules[i];
                        new aws.ec2.NetworkAclRule(`${name}-private-nacl-ingress-${i}`, {
                            networkAclId: nacl.id,
                            ruleNumber: rule.ruleNumber,
                            egress: false,
                            protocol: rule.protocol,
                            ruleAction: rule.ruleAction,
                            cidrBlock: rule.cidrBlock,
                            ipv6CidrBlock: rule.ipv6CidrBlock,
                            fromPort: rule.fromPort,
                            toPort: rule.toPort,
                        }, { parent: nacl });
                    }
                }
                
                // Egress rules
                if (args.privateSubnets.networkAcl.outboundRules) {
                    for (let i = 0; i < args.privateSubnets.networkAcl.outboundRules.length; i++) {
                        const rule = args.privateSubnets.networkAcl.outboundRules[i];
                        new aws.ec2.NetworkAclRule(`${name}-private-nacl-egress-${i}`, {
                            networkAclId: nacl.id,
                            ruleNumber: rule.ruleNumber,
                            egress: true,
                            protocol: rule.protocol,
                            ruleAction: rule.ruleAction,
                            cidrBlock: rule.cidrBlock,
                            ipv6CidrBlock: rule.ipv6CidrBlock,
                            fromPort: rule.fromPort,
                            toPort: rule.toPort,
                        }, { parent: nacl });
                    }
                }
            }
        }
        
        // Database subnets
        let databaseSubnets: aws.ec2.Subnet[] = [];
        let databaseRouteTables: aws.ec2.RouteTable[] = [];
        let databaseSubnetGroup: aws.rds.SubnetGroup | undefined;
        
        if (createVpc && args.databaseSubnets?.cidrBlocks && args.databaseSubnets.cidrBlocks.length > 0) {
            // Create dedicated route tables if specified
            if (args.databaseSubnets.createRouteTable) {
                for (let i = 0; i < args.databaseSubnets.cidrBlocks.length; i++) {
                    // Calculate AZ index in a safe way
                const azIndex = pulumi.output(args.azs).apply(azs => i % azs.length);
                    const az = pulumi.output(args.azs).apply(azs => {
                    const index = i % azs.length;
                    return azs[index];
                });
                    
                    const rt = new aws.ec2.RouteTable(`${name}-database-rt-${i}`, {
                        vpcId: vpc!.id,
                        tags: pulumi.all([az]).apply(([currentAz]) => ({
                            Name: `${args.name}-${args.databaseSubnets?.suffix || "db"}-${currentAz}`,
                            ...args.tags,
                            ...args.databaseSubnets?.routeTableTags,
                        })),
                    }, { parent: vpc });
                    
                    databaseRouteTables.push(rt);
                    
                    // Add Internet Gateway route if specified
                    if (internetGateway && args.databaseSubnets.createInternetGatewayRoute) {
                        new aws.ec2.Route(`${name}-database-route-igw-${i}`, {
                            routeTableId: rt.id,
                            destinationCidrBlock: "0.0.0.0/0",
                            gatewayId: internetGateway.id,
                        }, { parent: rt });
                    }
                    
                    // Add NAT Gateway route if specified
                    if (natGateways.length > 0 && args.databaseSubnets.createNatGatewayRoute) {
                        // Determine NAT gateway index based on configuration
                        const natGwIndex = pulumi.all([
                            args.natGateway?.onePerAz || false, 
                            args.natGateway?.single || false,
                            azIndex,
                            i,
                            natGateways.length
                        ]).apply(([onePerAz, single, currentAzIndex, subnetIndex, natCount]) => {
                            if (onePerAz) {
                                return currentAzIndex % natCount;
                            } else if (single) {
                                return 0;
                            } else {
                                return subnetIndex % natCount;
                            }
                        });
                        
                        // Create route to NAT gateway
                        new aws.ec2.Route(`${name}-database-route-natgw-${i}`, {
                            routeTableId: rt.id,
                            destinationCidrBlock: args.natGateway?.destinationCidrBlock || "0.0.0.0/0",
                            natGatewayId: pulumi.output(natGwIndex).apply(index => natGateways[index].id),
                        }, { parent: rt });
                    }
                    
                    // Add IPv6 egress route if applicable
                    if (args.enableIpv6 && egressOnlyInternetGateway) {
                        new aws.ec2.Route(`${name}-database-route-eigw-${i}`, {
                            routeTableId: rt.id,
                            destinationIpv6CidrBlock: "::/0",
                            egressOnlyGatewayId: egressOnlyInternetGateway.id,
                        }, { parent: rt });
                    }
                }
            }
            
            // Create subnets
            for (let i = 0; i < args.databaseSubnets.cidrBlocks.length; i++) {
                // Calculate AZ index in a safe way
                const azIndex = pulumi.output(args.azs).apply(azs => i % azs.length);
                const az = pulumi.output(args.azs).apply(azs => {
                    const index = i % azs.length;
                    return azs[index];
                });
                
                // Generate subnet name
                const subnetName = pulumi.all([az, args.databaseSubnets?.names?.[i] || ""]).apply(([currentAz, explicitName]) => {
                    return explicitName || `${args.name}-${args.databaseSubnets?.suffix || "db"}-${currentAz}`;
                });
                
                // Create subnet args
                let subnetArgs: aws.ec2.SubnetArgs = {
                    vpcId: vpc!.id,
                    cidrBlock: args.databaseSubnets.ipv6Native ? undefined : args.databaseSubnets.cidrBlocks[i],
                    availabilityZone: az,
                    assignIpv6AddressOnCreation: args.enableIpv6 && args.databaseSubnets.ipv6Native 
                        ? true 
                        : args.databaseSubnets.assignIpv6AddressOnCreation || false,
                    enableDns64: args.enableIpv6 && args.databaseSubnets.enableDns64,
                    enableResourceNameDnsAaaaRecordOnLaunch: args.enableIpv6 && args.databaseSubnets.enableResourceNameDnsAaaaRecordOnLaunch,
                    enableResourceNameDnsARecordOnLaunch: !args.databaseSubnets.ipv6Native && args.databaseSubnets.enableResourceNameDnsARecordOnLaunch,
                    privateDnsHostnameTypeOnLaunch: args.databaseSubnets.privateDnsHostnameTypeOnLaunch,
                    tags: pulumi.all([subnetName, az]).apply(([name, currentAz]) => ({
                        Name: name,
                        ...args.tags,
                        ...args.databaseSubnets?.tags,
                        ...(args.databaseSubnets?.tagsPerAz && args.databaseSubnets.tagsPerAz[currentAz] || {}),
                    })),
                };
                
                // Handle IPv6 CIDR block separately
                if (args.enableIpv6 && args.databaseSubnets.ipv6Prefixes && args.databaseSubnets.ipv6Prefixes[i]) {
                    if (vpc && vpc.ipv6CidrBlock) {
                        const prefix = args.databaseSubnets.ipv6Prefixes[i];
                        subnetArgs.ipv6CidrBlock = vpc.ipv6CidrBlock.apply(cidr => {
                            if (!cidr) return undefined;
                            const base = cidr.substring(0, cidr.lastIndexOf('/'));
                            const prefixLen = parseInt(cidr.substring(cidr.lastIndexOf('/') + 1)) + 8;
                            return `${base}/${prefixLen}:${prefix}::/64`;
                        }) as pulumi.Input<string>;
                    }
                }
                
                // Set IPv6 native if specified
                if (args.enableIpv6 && args.databaseSubnets.ipv6Native) {
                    subnetArgs.ipv6Native = true;
                }
                
                const subnet = new aws.ec2.Subnet(`${name}-database-${i}`, subnetArgs, { parent: vpc });
                databaseSubnets.push(subnet);
                
                // Associate with route table
                if (databaseRouteTables.length > 0) {
                    new aws.ec2.RouteTableAssociation(`${name}-database-rta-${i}`, {
                        subnetId: subnet.id,
                        routeTableId: databaseRouteTables[i % databaseRouteTables.length].id,
                    }, { parent: vpc });
                } else if (privateRouteTables.length > 0) {
                    // If no dedicated database route tables, use private route tables
                    const rtIndex = i % privateRouteTables.length;
                    new aws.ec2.RouteTableAssociation(`${name}-database-rta-${i}`, {
                        subnetId: subnet.id,
                        routeTableId: privateRouteTables[rtIndex].id,
                    }, { parent: vpc });
                }
            }
            
            // Create subnet group if specified
            if (args.databaseSubnets.createSubnetGroup !== false) {
                databaseSubnetGroup = new aws.rds.SubnetGroup(`${name}-database-subnet-group`, {
                    name: args.databaseSubnets.subnetGroupName || `${args.name}-database`,
                    subnetIds: databaseSubnets.map(s => s.id),
                    tags: pulumi.output({
                        Name: args.databaseSubnets.subnetGroupName || `${args.name}-database`,
                        ...args.tags,
                        ...args.databaseSubnets.subnetGroupTags,
                    }),
                }, { parent: vpc });
            }
            
            // Create dedicated network ACL if specified
            if (args.databaseSubnets.networkAcl?.dedicated) {
                const nacl = new aws.ec2.NetworkAcl(`${name}-database-nacl`, {
                    vpcId: vpc!.id,
                    subnetIds: databaseSubnets.map(s => s.id),
                    tags: {
                        Name: `${args.name}-${args.databaseSubnets.suffix || "db"}`,
                        ...args.tags,
                        ...args.databaseSubnets.networkAcl.tags,
                    },
                }, { parent: vpc });
                
                // Ingress rules
                if (args.databaseSubnets.networkAcl.inboundRules) {
                    for (let i = 0; i < args.databaseSubnets.networkAcl.inboundRules.length; i++) {
                        const rule = args.databaseSubnets.networkAcl.inboundRules[i];
                        new aws.ec2.NetworkAclRule(`${name}-database-nacl-ingress-${i}`, {
                            networkAclId: nacl.id,
                            ruleNumber: rule.ruleNumber,
                            egress: false,
                            protocol: rule.protocol,
                            ruleAction: rule.ruleAction,
                            cidrBlock: rule.cidrBlock,
                            ipv6CidrBlock: rule.ipv6CidrBlock,
                            fromPort: rule.fromPort,
                            toPort: rule.toPort,
                        }, { parent: nacl });
                    }
                }
                
                // Egress rules
                if (args.databaseSubnets.networkAcl.outboundRules) {
                    for (let i = 0; i < args.databaseSubnets.networkAcl.outboundRules.length; i++) {
                        const rule = args.databaseSubnets.networkAcl.outboundRules[i];
                        new aws.ec2.NetworkAclRule(`${name}-database-nacl-egress-${i}`, {
                            networkAclId: nacl.id,
                            ruleNumber: rule.ruleNumber,
                            egress: true,
                            protocol: rule.protocol,
                            ruleAction: rule.ruleAction,
                            cidrBlock: rule.cidrBlock,
                            ipv6CidrBlock: rule.ipv6CidrBlock,
                            fromPort: rule.fromPort,
                            toPort: rule.toPort,
                        }, { parent: nacl });
                    }
                }
            }
        }
        
        // VPN Gateway
        let vpnGateway: aws.ec2.VpnGateway | undefined;
        
        if (createVpc && args.enableVpnGateway) {
            if (args.vpnGatewayId) {
                // Attach existing VPN Gateway
                new aws.ec2.VpnGatewayAttachment(`${name}-vpn-attachment`, {
                    vpnGatewayId: args.vpnGatewayId,
                    vpcId: vpc!.id,
                }, { parent: vpc });
                
                this.vpnGatewayId = pulumi.output(args.vpnGatewayId);
            } else {
                // Create new VPN Gateway
                vpnGateway = new aws.ec2.VpnGateway(`${name}-vpn`, {
                    vpcId: vpc!.id,
                    availabilityZone: args.vpnGatewayAz,
                    amazonSideAsn: args.amazonSideAsn || "64512",
                    tags: {
                        Name: args.name,
                        ...args.tags,
                        ...args.vpnGatewayTags,
                    },
                }, { parent: vpc });
                
                this.vpnGatewayId = vpnGateway.id;
                
                // Route propagation
                if (args.propagatePrivateRouteTablesVgw && privateRouteTables.length > 0) {
                    for (let i = 0; i < privateRouteTables.length; i++) {
                        new aws.ec2.VpnGatewayRoutePropagation(`${name}-vpn-private-rt-${i}`, {
                            vpnGatewayId: vpnGateway.id,
                            routeTableId: privateRouteTables[i].id,
                        }, { parent: vpnGateway });
                    }
                }
                
                if (args.propagatePublicRouteTablesVgw && publicRouteTables.length > 0) {
                    for (let i = 0; i < publicRouteTables.length; i++) {
                        new aws.ec2.VpnGatewayRoutePropagation(`${name}-vpn-public-rt-${i}`, {
                            vpnGatewayId: vpnGateway.id,
                            routeTableId: publicRouteTables[i].id,
                        }, { parent: vpnGateway });
                    }
                }
            }
        }
        
        // VPC Flow Logs
        let flowLog: aws.ec2.FlowLog | undefined;
        if (createVpc && args.flowLog?.enable) {
            let logDestinationArn: pulumi.Output<string> | undefined;
            let iamRoleArn: pulumi.Output<string> | undefined;
            
            if (args.flowLog.cloudWatch?.createLogGroup) {
                // Create CloudWatch Log Group
                const logGroupName = `${args.flowLog.cloudWatch.logGroupNamePrefix || "/aws/vpc-flow-log/"}${args.name}${args.flowLog.cloudWatch.logGroupNameSuffix || ""}`;
                const logGroup = new aws.cloudwatch.LogGroup(`${name}-flow-log-group`, {
                    name: logGroupName,
                    retentionInDays: args.flowLog.cloudWatch.retentionInDays,
                    kmsKeyId: args.flowLog.cloudWatch.kmsKeyId,
                    skipDestroy: args.flowLog.cloudWatch.skipDestroy,
                    tags: args.tags,
                }, { parent: this });
                
                logDestinationArn = logGroup.arn;
            } else if (args.flowLog.destinationArn) {
                logDestinationArn = pulumi.output(args.flowLog.destinationArn);
            }
            
            if (args.flowLog.cloudWatch?.createIamRole) {
                // Create IAM Role for Flow Logs
                const roleName = args.flowLog.iamRoleUseNamePrefix
                    ? undefined
                    : args.flowLog.iamRoleName || `${args.name}-vpc-flow-log-role`;
                const roleNamePrefix = args.flowLog.iamRoleUseNamePrefix
                    ? args.flowLog.iamRoleName || `${args.name}-vpc-flow-log-role-`
                    : undefined;
                
                const role = new aws.iam.Role(`${name}-flow-log-role`, {
                    name: roleName,
                    namePrefix: roleNamePrefix,
                    assumeRolePolicy: JSON.stringify({
                        Version: "2012-10-17",
                        Statement: [{
                            Effect: "Allow",
                            Principal: {
                                Service: "vpc-flow-logs.amazonaws.com"
                            },
                            Action: "sts:AssumeRole"
                        }]
                    }),
                    permissionsBoundary: args.flowLog.permissionsBoundary,
                    tags: args.tags,
                }, { parent: this });
                
                const policyName = args.flowLog.iamPolicyUseNamePrefix
                    ? undefined
                    : args.flowLog.iamPolicyName || `${args.name}-vpc-flow-log-to-cloudwatch`;
                const policyNamePrefix = args.flowLog.iamPolicyUseNamePrefix
                    ? args.flowLog.iamPolicyName || `${args.name}-vpc-flow-log-to-cloudwatch-`
                    : undefined;
                
                new aws.iam.RolePolicy(`${name}-flow-log-policy`, {
                    name: policyName,
                    namePrefix: policyNamePrefix,
                    role: role.id,
                    policy: JSON.stringify({
                        Version: "2012-10-17",
                        Statement: [{
                            Effect: "Allow",
                            Action: [
                                "logs:CreateLogStream",
                                "logs:PutLogEvents",
                                "logs:DescribeLogGroups",
                                "logs:DescribeLogStreams"
                            ],
                            Resource: "*"
                        }]
                    }),
                }, { parent: role });
                
                iamRoleArn = role.arn;
            } else if (args.flowLog.cloudWatch?.iamRoleArn) {
                iamRoleArn = pulumi.output(args.flowLog.cloudWatch.iamRoleArn);
            }
            
            // Create Flow Log with appropriate arguments
            const flowLogArgs: aws.ec2.FlowLogArgs = {
                logDestination: logDestinationArn,
                logDestinationType: args.flowLog.destinationType || "cloud-watch-logs",
                trafficType: args.flowLog.trafficType || "ALL",
                vpcId: vpc!.id,
                maxAggregationInterval: args.flowLog.maxAggregationInterval || 600,
                iamRoleArn: iamRoleArn,
                logFormat: args.flowLog.logFormat,
                deliverCrossAccountRole: args.flowLog.deliverCrossAccountRole,
                tags: {
                    Name: args.name,
                    ...args.tags,
                    ...args.flowLog.tags,
                },
            };
            
            // Only add fileFormat if defined
            if (args.flowLog.fileFormat) {
                (flowLogArgs as any).fileFormat = args.flowLog.fileFormat;
            }
            
            // Only add hiveCompatiblePartitions if defined
            if (args.flowLog.hiveCompatiblePartitions !== undefined) {
                (flowLogArgs as any).hiveCompatiblePartitions = args.flowLog.hiveCompatiblePartitions;
            }
            
            // Only add perHourPartition if defined
            if (args.flowLog.perHourPartition !== undefined) {
                (flowLogArgs as any).perHourPartition = args.flowLog.perHourPartition;
            }
            
            flowLog = new aws.ec2.FlowLog(`${name}-flow-log`, flowLogArgs, { parent: vpc });
        }
        
        // Set outputs
        // For subnet IDs, we need to ensure we're returning string arrays
        this.publicSubnets = publicSubnets.length > 0
            ? pulumi.all(publicSubnets.map(subnet => subnet.id))
            : undefined;
        
        this.publicSubnetArns = publicSubnets.length > 0
            ? pulumi.all(publicSubnets.map(subnet => subnet.arn))
            : undefined;
        
        this.publicSubnetCidrBlocks = publicSubnets.length > 0
            ? pulumi.all(publicSubnets.map(subnet => subnet.cidrBlock))
                .apply(blocks => blocks.filter(block => block !== undefined) as string[])
            : undefined;
        
        this.privateSubnets = privateSubnets.length > 0
            ? pulumi.all(privateSubnets.map(subnet => subnet.id))
            : undefined;
        
        this.privateSubnetArns = privateSubnets.length > 0
            ? pulumi.all(privateSubnets.map(subnet => subnet.arn))
            : undefined;
        
        this.privateSubnetCidrBlocks = privateSubnets.length > 0
            ? pulumi.all(privateSubnets.map(subnet => subnet.cidrBlock))
                .apply(blocks => blocks.filter(block => block !== undefined) as string[])
            : undefined;
        
        this.publicRouteTableIds = publicRouteTables.length > 0
            ? pulumi.all(publicRouteTables.map(rt => rt.id))
            : undefined;
        
        this.privateRouteTableIds = privateRouteTables.length > 0
            ? pulumi.all(privateRouteTables.map(rt => rt.id))
            : undefined;
        
        this.natGatewayIds = natGateways.length > 0
            ? pulumi.all(natGateways.map(ng => ng.id))
            : undefined;
        
        this.natPublicIps = natPublicIps.length > 0
            ? pulumi.all(natPublicIps)
            : undefined;
        
        this.databaseSubnets = databaseSubnets.length > 0
            ? pulumi.all(databaseSubnets.map(subnet => subnet.id))
            : undefined;
        
        this.databaseSubnetGroup = databaseSubnetGroup?.id;
        this.databaseSubnetGroupName = databaseSubnetGroup?.name;
        
        this.flowLogId = flowLog?.id;
        
        this.registerOutputs({
            vpcId: this.vpcId,
            vpcArn: this.vpcArn,
            vpcCidrBlock: this.vpcCidrBlock,
            igwId: this.igwId,
            igwArn: this.igwArn,
            dhcpOptionsId: this.dhcpOptionsId,
            natGatewayIds: this.natGatewayIds,
            natPublicIps: this.natPublicIps,
            publicSubnets: this.publicSubnets,
            publicSubnetArns: this.publicSubnetArns,
            publicSubnetCidrBlocks: this.publicSubnetCidrBlocks,
            publicRouteTableIds: this.publicRouteTableIds,
            privateSubnets: this.privateSubnets,
            privateSubnetArns: this.privateSubnetArns,
            privateSubnetCidrBlocks: this.privateSubnetCidrBlocks,
            privateRouteTableIds: this.privateRouteTableIds,
            databaseSubnets: this.databaseSubnets,
            databaseSubnetGroup: this.databaseSubnetGroup,
            databaseSubnetGroupName: this.databaseSubnetGroupName,
            vpnGatewayId: this.vpnGatewayId,
            flowLogId: this.flowLogId,
        });
    }
}