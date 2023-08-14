/*variable "namespace" {
  type = string
}

variable "vpc" {
  type = any
}

variable key_name {
  type = string
}

variable "sg_pub_id" {
  type = any
}

variable "sg_priv_id" {
  type = any
}

/*variable "namespace" {
  type = string
}*/


# Region
variable "region" {
  description = "The AWS region where the VPC and subnets will be created."
  default     = "us-east-1"
}


# AMI ID
variable "ami_id" {}

# Instance Type
variable "instance_type" {
  default = "t2.micro"
}

# Subnet ID
variable "subnet_id" {}

# Tags 
variable "name" {
  default =   "test"
}