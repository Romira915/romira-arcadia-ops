migration "state" "import_vcn" {
    actions = [
        "import oci_core_internet_gateway.internet_gateway_for_ampere ocid1.internetgateway.oc1.ap-tokyo-1.aaaaaaaa3mhoafthytjitxdlxfa5bfrf7msdnfcxwrspzynphsolezwfdnnq",
        "import oci_core_route_table.route_table_for_public_subnet ocid1.routetable.oc1.ap-tokyo-1.aaaaaaaaqyrpl2dvqkqyx6sfvqa6lw5qdtungizgci465inkrfedrnjc4swq",
        "import oci_core_security_list.security_list_for_ampere ocid1.securitylist.oc1.ap-tokyo-1.aaaaaaaagpq56xt5jg7wlw33yuy7jmhnevxxn25emc5t4yfnqtp26wuwxs5a",
        "import oci_core_subnet.public_ampere_subnet ocid1.subnet.oc1.ap-tokyo-1.aaaaaaaazk5iwsf6frbbvheyivibgdt3uqybxz3n7qqkibqj2ckug6qkjoaq",
    ]
}
