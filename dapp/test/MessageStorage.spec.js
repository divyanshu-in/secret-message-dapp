const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { expect } = require("chai");

describe("MessageStorage", function () {

  async function deployMessageStorageFixture() {

    const message = "MESSAGE"
    const password = "PASSWORD"

    const [owner, otherAccount] = await ethers.getSigners();

    const MessageStorage = await ethers.getContractFactory("MessageStorage");
    const messageStorage = await MessageStorage.deploy(message, password);

    return { message, password, messageStorage, owner, otherAccount }
  }

  describe("fetch message", () => {
    let message, password, messageStorage, owner, otherAccount;

    this.beforeAll(async () => {
      ({ message, password, messageStorage, owner, otherAccount } = await loadFixture(deployMessageStorageFixture));
    })

    it("Should return message for correct password", async function () {

      const msg = await messageStorage.getMessage(password);
      expect(msg).to.equal(message);
    })

    it("Should return correct admin", async function () {

      const admin = await messageStorage.getAdmin();
      expect(admin).to.equal(owner.address);
    })

    it("Should revert when message is incorrect", async function () {
      const incorrectPassword = "INCORRECT_PASS"

      await expect(messageStorage.getMessage(incorrectPassword)).to.be.revertedWith("MessageStorage: incorrect password")
    })

    it("Should change message when admin calls `setMessage`", async function () {
      const newMessage = "NET_MESSAGE"
      await messageStorage.setMessage(newMessage)

      const msg = await messageStorage.getMessage(password);

      expect(msg).to.equal(newMessage);
    })

    it("Should revert when `setMessage` is called by `non-admin` account", async function () {

      const newMessage = "NET_MESSAGE"
      await expect(messageStorage.connect(otherAccount).setMessage(newMessage)).to.be.revertedWith("MessageStorage: sender not admin")
    })
  })
});

