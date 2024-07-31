import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as MessageStorageAbi from './abi/MessageStorage.json'

@Injectable()
export class AppService {

  private provider: ethers.Provider;
  private contract: ethers.Contract;
  private signer: ethers.Wallet;
  private password: string

  async onModuleInit() {
    this.provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_RPC);
    this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      MessageStorageAbi.abi,
      this.signer,
    );
    this.password = process.env.PASSWORD;
  }

  async getMessage(): Promise<string> {
    const message = await this.contract.getMessage(this.password);
    return message;
  }

  async setMessage(message: string): Promise<ethers.TransactionResponse> {
    const tx = await this.contract.setMessage(message);
    return tx;
  }
}
