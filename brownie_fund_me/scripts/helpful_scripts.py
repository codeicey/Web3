from brownie import network, config, accounts

# list is only for development, testnets use private key
def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])
