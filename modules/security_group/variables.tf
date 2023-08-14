/*variable "your_public_ip" {
  description = "Your public IP address"
  default = "136.226.252.102/32" 
}

variable "environment" {
  description = "The environment name for the VPC (e.g., dev, qa, prod)."
}

variable "vpc_id" {
  description = "The ID of the VPC"
}*/

variable "region" {
  description = "The AWS region where the security groups will be created."
}

variable "vpc_id" {
  description = "The ID of the VPC to associate the security groups with."
}

variable "your_public_ip" {
  description = "Your public IP address."
  default = "136.226.252.102/32"
}

variable "environment" {
  description = "The environment name for the security groups (e.g., dev, qa, prod)."
}