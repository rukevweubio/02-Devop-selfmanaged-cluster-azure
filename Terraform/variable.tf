variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "kml_rg_main-0d6e5998831347ca"
}

variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "westus"
}

variable "vnet_name" {
  description = "Virtual Network name"
  type        = string
  default     = "k8s-vnet"
}

variable "subnet_name" {
  description = "Subnet name"
  type        = string
  default     = "k8s-subnet"
}

variable "admin_username" {
  description = "Admin username for VMs"
  type        = string
  default     = "azureuser"
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "id_rsa.pub"
}

variable "vm_size" {
  description = "Size of the VMs"
  type        = string
  default     = "Standard_B2s"
}

variable "image_publisher" {
  description = "VM image publisher"
  type        = string
  default     = "Canonical"
}

variable "image_offer" {
  description = "VM image offer"
  type        = string
  default     = "UbuntuServer"
}

variable "image_sku" {
  description = "VM image SKU"
  type        = string
  default     = "20_04-lts-gen2"
}