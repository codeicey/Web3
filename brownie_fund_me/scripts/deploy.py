# from msilib.schema import PublishComponent
from brownie import FundMe, network
from scripts.helpful_scripts import get_account


def deploy_fund_me():
    account = get_account()
    #  pass price feed

    # if we are on persistent network like rinkeby, use associated address
    # else, deploy mocks
    if network.show_active() != "development":
        price_feed_address = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    fund_me = FundMe.deploy(
        price_feed_address,
        {"from": account},
        publish_source=True,
    )
    print(f"Contract deployed to {fund_me.address}")


def main():
    deploy_fund_me()
