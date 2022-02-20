from scripts.helpful_scripts import encode_function_data, get_account, upgrade
from brownie import (
    Box,
    ProxyAdmin,
    TransparentUpgradeableProxy,
    BoxV2,
    Contract,
    exceptions,
)
import pytest


def test_proxy_upgrades():
    account = get_account()
    box = Box.deploy({"from": account})
    proxy_admin = ProxyAdmin.deploy({"from": account})
    box_encoded_initializer_function = encode_function_data()
    proxy = TransparentUpgradeableProxy.deploy(
        box.address,
        proxy_admin.address,
        box_encoded_initializer_function,
        {"from": account, "gas_limit": 1000000},
    )

    # deploy BoxV2
    box_v2 = BoxV2.deploy({"from": account})
    proxy_box = Contract.from_abi("BoxV2", proxy.address, BoxV2.abi)
    # to check that it shouldn't work
    with pytest.raises(exceptions.VirtualMachineError):
        proxy_box.increment({"from": account})
    # upgrade
    upgrade(account, proxy, box_v2, proxy_admin_contract=proxy_admin)
    assert proxy_box.retrieve() == 0
    # increment and check if it works after upgrade
    proxy_box.increment({"from": account})
    assert proxy_box.retrieve() == 1
