module "vpc" {
  source = "./modules/vpc"
  region           = var.region
  main_vpc_cidr    = var.main_vpc_cidr
  //private_subnets  = var.private_subnets
  environment      = var.environment
  vpc_id                  = module.vpc.vpc_id 
}

module "security_group" {
  source = "./modules/security_group"
  region          = var.region
  environment      = var.environment
  vpc_id        = module.vpc.vpc_id
  your_public_ip = "136.226.252.102/32"  # Replace "YOUR_PUBLIC_IP" with your actual public IP address
}

/*module "application_instances" {
  source               = "./modules/instance"
  instance_configurations = local.application_instances["web"]
  subnet_id            = module.vpc.private_subnet_id
  vpc_id               = module.vpc.vpc_id  # You may need to update this if the module requires a VPC ID
  instance_count       = local.application_instances["web"].instance_count
  windows_ami_name     = local.application_instances["web"].ami_name
  instance_type        = local.application_instances["web"].instance_type
  key_name             = "your_key_pair_name_here"  # Replace with the actual SSH key pair name
  availability_zones   = local.application_instances["web"].availability_zone
   
  # Other input variables for the application instances module
}

  locals {
  application_instances = {
    web = {
  # Pass other required input variables here
  instance_count         = 2
  ami_name       = "Microsoft Windows Server 2019 Base"  # Replace with the Windows AMI Name you want to use
  instance_type         = "t3a.medium"   # Replace with the desired instance type
  key_name              = "your-key-name"  # Replace with the key name you want to use
  availability_zone    = ["us-east-1a"]  # Specify the availability zones here
  }
  # Add configurations for other tiers (app, backoffice, database, alb)
  }
}*/

/*module "web_instances" {
  source                = "./modules/instance"  # Replace with the actual source path
  instance_config       = local.application_instances["web"]
  subnet_id             = module.vpc.private_subnet_id  # Use the correct output from the vpc module
  vpc_id                = local.vpc_id  # Use the VPC ID from the local value
  availability_zones    = local.application_instances["web"].availability_zone
}*/

/*module "ec2" {
  source    = "./modules/ec2"
  namespace = var.namespace
}*/

module "instance" {
  source     = "./modules/instance"
  namespace  = var.namespace
  vpc       = module.vpc.vpc_id
  sg_pub_id  = module.vpc.sg_pub_id
  sg_priv_id = module.vpc.sg_priv_id
  key_name   = module.instance.key_name
}