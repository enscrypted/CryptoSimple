# CryptoSimple
**Purpose:**     Lightweight, Text-Based Encryption and Decryption

**Inputs:**      Text (cipher/plaintext), Action (encryption/decryption), Type (rsa/aes)

**Outputs:**     Cipher (when input = plaintext), Plaintext (when input = plaintext) 

**Functions:**   Encrypt/Decrypt via AES/RSA with keys predefined in an environment variable

CryptoSimple is a proof of concept, entirely developed and writted via command line using a Google Pixel 7 Pro, Termux, and Nano

## Requirements
1. NodeJS

## Installation
1. Clone the repository
2. In the root of the repository, type "npm install" via command line

## Usage
1. Before beginning, ensure you have created a .env file with values defined for aes_key, aes_iv, rsa_pub, and rsa_priv
2. Type "npm start" in command line and navigate to localhost:3000 in a browser
3. Enter desired text input, select between Encrypt/Decrypt and RSA/AES, and press submit
4. The Results page will be rendered, containing a textarea with the calculated value and a button that copies it to the clipboard

## Planned Features
1. Ability to input desired key instead of using environment variables, ideal for users with multiple keys and RSA encryption intended for someone else. The default would still be environment defined keys.
2. UI improvements
3. File encryption, rather than just text

## License


CryptoSimple is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    CryptoSimple is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along with CryptoSimple. If not, see http://www.gnu.org/licenses/.
