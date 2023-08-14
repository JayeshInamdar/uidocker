/*resource "aws_security_group" "alb_sg" {
  name_prefix = "alb-sg-"

  vpc_id = var.vpc_id

  # Allow incoming traffic on port 80 from your IP address
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [ var.your_public_ip ]
  }

  # Allow incoming traffic on port 443 for HTTPS (optional if you need SSL termination)
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [ var.your_public_ip ]
  }

  # Add more ingress rules as needed for other ports or sources

  # Allow all outgoing traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}*/

locals {
  app_names = ["Load Balancer", "Web", "Web mobile", "App","App mobile", "Back_office", "Database"]
}

resource "aws_security_group" "app_sg" {
  count      = length(local.app_names)
  name       = "D247-${var.environment}-${lower(replace(local.app_names[count.index], " ", "_"))}-sg"
  vpc_id     = var.vpc_id

  # Allow incoming traffic on port 80 from your IP address
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [var.your_public_ip]
  }

  # Allow incoming traffic on port 443 for HTTPS (optional if you need SSL termination)
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.your_public_ip]
  }

  # Add more ingress rules as needed for other ports or sources

  # Allow all outgoing traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
    tags = {
    Dept       = "Deluxe"
    BudgetCode = "Deluxe"
    Owner      = "D247"
    managed_by = "Terraform"
    Project    = "D247"
    Stack      = "DEV"
    Name       = "D247-${var.environment}-${lower(replace(local.app_names[count.index], " ", "_"))}-sg"
  }


}
