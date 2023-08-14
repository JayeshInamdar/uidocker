variable "region" {
  description = "The AWS region where the VPC and subnets will be created."
  default     = "us-east-1"
}

variable "main_vpc_cidr" {
  description = "The CIDR block for the main VPC."
  default = "10.10.0.0/22"
}

/*variable "private_subnets" {
  description = "A list of CIDR blocks for the private subnets."
  type        = list(any)
  default = ["10.10.0.64/28", "10.10.0.80/28","10.10.0.96/28", "10.10.0.112/28", "10.10.0.128/28", "10.10.0.144/28", "10.10.0.160/28", "10.10.0.176/28", "10.10.0.192/27", "10.10.0.224/27"]
}*/

variable "private_subnets" {
  description = "A list of CIDR blocks for the private subnets."
  type        = list(any)
  default = [
    "10.10.0.96/28", "10.10.0.128/28", "10.10.0.192/27", "10.10.0.160/28", "10.10.0.64/28", 
    "10.10.1.32/28", "10.10.1.64/28", "10.10.1.128/27", "10.10.1.96/28", "10.10.1.0/28",
    "10.10.1.224/28", "10.10.2.0/28", "10.10.2.64/27", "10.10.2.32/28", "10.10.1.192/28",
    "10.10.2.160/28", "10.10.2.192/28", "10.10.3.0/27", "10.10.2.224/28", "10.10.2.128/28",
    "10.10.3.96/28", "10.10.3.128/28", "10.10.3.192/27", "10.10.3.160/28", "10.10.3.64/28",
    "10.10.0.112/28", "10.10.0.144/28", "10.10.0.224/27", "10.10.0.176/28", "10.10.0.80/28",
    "10.10.1.48/28", "10.10.1.80/28", "10.10.1.160/27", "10.10.1.112/28", "10.10.1.16/28",
    "10.10.1.240/28", "10.10.2.16/28", "10.10.2.96/27", "10.10.2.48/28", "10.10.1.208/28",
    "10.10.2.176/28", "10.10.2.208/28", "10.10.3.32/27", "10.10.2.240/28", "10.10.2.144/28",
    "10.10.3.112/28", "10.10.3.144/28", "10.10.3.224/27", "10.10.3.176/28", "10.10.3.80/28"
  ]
}
variable "vpc_id" {
  description = "The ID of the VPC"
}


variable "environment" {
  description = "The environment name for the VPC (e.g., dev, qa, prod)."
}

variable "app_name" {
  description = "The name of the app"
  default = "web"
}


 


