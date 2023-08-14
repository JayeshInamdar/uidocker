output "vpc_id" {
  value = module.vpc.vpc_id
}

output "instance_ids" {
  description = "IDs of the created Windows instances."
  value       = flatten([for app_name, config in local.instance_configurations : aws_instance.app[app_name].*.id])
}

output "public_connection_string" {
  description = "Copy/Paste/Enter - You are in the matrix"
  value       = "ssh -i ${module.ssh-key.key_name}.pem ec2-user@${module.ec2.public_ip}"
}

output "private_connection_string" {
  description = "Copy/Paste/Enter - You are in the private ec2 instance"
  value       = "ssh -i ${module.ssh-key.key_name}.pem ec2-user@${module.ec2.private_ip}"
}