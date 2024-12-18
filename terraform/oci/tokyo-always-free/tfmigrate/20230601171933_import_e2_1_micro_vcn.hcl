migration "state" "import_e2_1_micro_vcn" {
    actions = [
        "import oci_core_vcn.app_vcn ocid1.vcn.oc1.ap-tokyo-1.amaaaaaaa325ehaas3midt5mqj3qajv7kpcazu7yyo7nc3jxk2ursiy77iiq",
        "import oci_core_internet_gateway.internet_gateway_for_app ocid1.internetgateway.oc1.ap-tokyo-1.aaaaaaaas7hlpc4k77kqdowweomkjnadfcxojobenlfu46oqzk47bzkknvcq",
        "import oci_core_route_table.route_table_for_app_public_subnet ocid1.routetable.oc1.ap-tokyo-1.aaaaaaaamxz6qxls5htzzt23e3pa6osggmmgfjsxqvrqstqbbgc7sptvu5ba",
        "import oci_core_security_list.security_list_for_app ocid1.securitylist.oc1.ap-tokyo-1.aaaaaaaargeuho24d7aqnbdwpvoonie72uqbposnvroey7lxoy53kcfk45ga",
        "import oci_core_subnet.public_app_subnet ocid1.subnet.oc1.ap-tokyo-1.aaaaaaaa3cumav3s6rqdeqhc5hi74gtsqusyw546qqfkbjck7rumpuj3tyhq"
    ]
}
