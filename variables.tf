variable "main_vpc_cidr" {
  description = "The CIDR block for the main VPC."
  default = "10.10.0.0/22"
}

variable "environment" {
  description = "The environment name for the VPC (e.g., dev, qa, prod)."
}

variable "region" {
  description = "The AWS region where the VPC and subnets will be created."
  default     = "us-east-1"
}

variable "appname"{
  description = "The name of the application"
  default = "web" 
}

/*variable "instance_count" {
  description = "Number of instances to create."
  type        = number
  default =  2
}

variable "windows_ami_name" {
  description = "AMI name for Windows instances."
  type        = string
  default = "Microsoft Windows Server 2019 Base"
}

variable "instance_type" {
  description = "Instance type for Windows instances."
  type        = string
}

variable "key_name" {
  description = "SSH key pair name for Windows instances."
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones for instances."
  type        = list(string)
}

data "aws_availability_zones" "available" {
  state = "available"
}*/


variable "namespace" {
  description = "The project namespace to use for unique resource naming"
  default     = "LL-TEST"
  type        = string
}

