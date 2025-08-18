-----------------------------------------------
# -------------------------------
# Public IPs
# -------------------------------
output "master_public_ip" {
  description = "Public IP of the master node"
  value       = azurerm_public_ip.master_pip.ip_address
}

output "worker1_public_ip" {
  description = "Public IP of worker1 node"
  value       = azurerm_public_ip.worker1_pip.ip_address
}

output "worker2_public_ip" {
  description = "Public IP of worker2 node"
  value       = azurerm_public_ip.worker2_pip.ip_address
}


output "master_private_ip" {
  description = "Private IP of the master node"
  value       = azurerm_network_interface.master_nic.private_ip_address
}

output "worker1_private_ip" {
  description = "Private IP of worker1 node"
  value       = azurerm_network_interface.worker1_nic.private_ip_address
}

output "worker2_private_ip" {
  description = "Private IP of worker2 node"
  value       = azurerm_network_interface.worker2_nic.private_ip_address
}