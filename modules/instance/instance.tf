// Create aws_ami filter to pick up the ami available in your region
data "aws_ami" "amazon-linux-2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}

resource "aws_instance" "app" {

ami               = var.ami_id
instance_type     = var.instance_type
availability_zone = data.aws_availability_zones.az.names[0]
subnet_id         = var.subnet_id

 tags = {
    "Name" = "${var.name}-instance"
  }
}

# AZ
data "aws_availability_zones" "az" {}