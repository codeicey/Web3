from brownie import SimpleStorage, accounts, config


def read_contract():
    simple_storage = SimpleStorage[-1]  # -1 for most recent deployment
    print(simple_storage.retrieve())


def main():
    read_contract()
