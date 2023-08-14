locals {
  app_names           = ["web", "app", "backoffice", "database", "alb"]
  availability_zones  = ["us-east-1a", "us-east-1b"]
  num_private_subnets = 50
}
resource "aws_vpc" "main" {
  cidr_block       = var.main_vpc_cidr
  instance_tenancy = "default"
  tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-vpc"
  }
}
/*resource "aws_internet_gateway" "IGW" {
  vpc_id = aws_vpc.main.id
  tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-IGW"
  }
}*/
resource "aws_subnet" "private_subnets_az1" {
  count             = local.num_private_subnets / 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = local.availability_zones[0]
   
  tags = {
    Name       = "D247-${local.app_names[count.index % 5]}-${local.availability_zones[0]}-{[count.index % 5])-${var.environment}"
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    app = local.app_names[count.index % 5]
  }
}

resource "aws_subnet" "private_subnets_az2" {
  count             = local.num_private_subnets / 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnets[count.index + local.num_private_subnets / 2]
  availability_zone = local.availability_zones[1]
  tags = {
    Name       = "Deluxe-D247-${local.app_names[count.index % 5]}-${local.availability_zones[1]}-[count.index % 5]-${var.environment}"
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    app = local.app_names[count.index % 5]
  }
}

# data "aws_subnets" "private" {
#   filter {
#     name   = "vpc-id"
#     values = [var.vpc_id]
#   }

#   tags = {
#     app = var.app_name

#   }
# }


/*resource "aws_subnet" "private_subnets_az1" {
  count             = local.num_private_subnets / 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = local.availability_zones[0]
  tags = {
    Name       = "D247-${local.app_names[count.index % 5]}-${local.availability_zones[0]}-{[count.index + 1])-${var.environment}"
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
  }
}
resource "aws_subnet" "private_subnets_az2" {
  count             = local.num_private_subnets / 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnets[count.index + local.num_private_subnets / 2]
  availability_zone = local.availability_zones[1]
  tags = {
    Name       = "D247-${local.app_names[count.index % 5]}-${local.availability_zones[0]}-{[count.index + 1])-${var.environment}"
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
  }
}*/
# Additional subnets without dividing into two AZs
resource "aws_subnet" "additional_subnets" {
  count             = 4
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.10.0.${16 * count.index}/28"
  availability_zone = local.availability_zones[count.index % 2]
  tags = {
    Name       = "D247-GCOReserve-Subnet-${count.index + 1}-${var.environment}"
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
  }
}

resource "aws_route_table" "PrivateRT_az1" {
  vpc_id = aws_vpc.main.id
  /*route {
    cidr_block     = "0.0.0.0/0"
   gateway_id     = aws_internet_gateway.IGW.id
  }*/
  tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-PrivateRT"
  }
}
resource "aws_route_table_association" "PrivateRTassociation_az1" {
  count         = local.num_private_subnets / 2
  subnet_id     = aws_subnet.private_subnets_az1[count.index].id
  route_table_id = aws_route_table.PrivateRT_az1.id
}
resource "aws_route_table_association" "PrivateRTassociation_az2" {
  count         = local.num_private_subnets / 2
  subnet_id     = aws_subnet.private_subnets_az2[count.index].id
  route_table_id = aws_route_table.PrivateRT_az1.id
}
/*resource "aws_nat_gateway" "NATgw_az1" {
  count         = local.num_private_subnets / 2
  allocation_id = aws_eip.natEIP[count.index].id
  subnet_id     = aws_subnet.private_subnets_az1[count.index].id
  tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-NATgw-${count.index + 1}"
  }
}
resource "aws_nat_gateway" "NATgw_az2" {
  count         = local.num_private_subnets / 2
  allocation_id = aws_eip.natEIP[count.index + local.num_private_subnets / 2].id
  subnet_id     = aws_subnet.private_subnets_az2[count.index].id
  tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-NATgw-${count.index + 1}"
  }
}
resource "aws_eip" "natEIP" {
  count = local.num_private_subnets / 2
  vpc   = true
  tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-NATgw-${count.index + 1}"
  }
}*/


data "aws_availability_zones" "available" {
  state = "available"
}


 