const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MessageStorageModule", (m) => {
  const message = m.getParameter("message", process.env.MESSAGE);
  const password = m.getParameter("password", process.env.PASSWORD);

  const storage = m.contract("MessageStorage", [message, password]);

  return { storage };
});
