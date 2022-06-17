const { Client, Intents, MessageEmbed  } = require('discord.js');
var axios = require('axios');
require('dotenv').config()

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const prefix = '!';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(function(){ 
        axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API}`).then(response => {
                    client.user.setActivity(`GWEI: ${response.data.result.ProposeGasPrice}`, { type: 'WATCHING' });
                }).catch(function (error) {
                    console.log(error)
                })
    }, 5000);
});

client.on('message', async (message) => {
try{
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "6c95b250-38c8-4dda-b3cc-4b584e30dbdb"
}
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    const [responseOne] = await Promise.all([
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/collection/info?type=${args[1]}`),
  ]);
    if(message.author.bot) return;
    if(cmd == "find") { 
      const SecondResponse = await axios.get(`https://api.modulenft.xyz/api/v1/opensea/token/info?tokenId=${args[2]}&collection=` + responseOne.data.info.contractAddress)
      const ThirdResponse = await axios.get(`https://api.opensea.io/api/v1/collection/` + args[1] + `/stats`)
      const FourthResponse = await axios.get(`https://api.modulenft.xyz/api/v1/opensea/orders/salesV2?type=` + args[1] + `&count=1&currencySymbol=ETH&offset=0`)
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setURL(`https://opensea.io/assets/ethereum/${SecondResponse.data.info.collectionInfo.address}/${args[2]}`)
                .setTitle(`Search for ${responseOne.data.collection} #${SecondResponse.data.info.tokenInfo.tokenId}`)
                .setDescription(responseOne.data.info.description)
                .setImage(SecondResponse.data.info.tokenInfo.image)
                .setFooter("Lumiere Tools | Powered by Module",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
              .addFields(
                  { name: 'Floor Price:', value: `${Math.round(ThirdResponse.data.stats.floor_price * 1000) / 1000}Ξ`, inline: true },
                  { name: 'Volume:', value: `${Math.round(ThirdResponse.data.stats.total_volume * 1) / 1}Ξ`, inline: true },
                  { name: 'Latest Sale:', value: `${FourthResponse.data.sales[0].price}Ξ`, inline: true },
                )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed2]})}
 } catch (err) {
  console.log("An error occurred: " + err)
}
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!lumiere help') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
              .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Statistics', value: '`!help scrape`', inline: true },
                    { name: 'Collection Info', value: '`!help collection`', inline: true },
                    { name: 'Latest Sale', value: '`!help sale`', inline: true },
                    { name: 'Latest Listing', value: '`!help listing`', inline: true },
                    { name: 'Trending', value: '`!help trending`', inline: true },
                    { name: 'Estimate', value: '`!help estimate`', inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!help scrape') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription('The stats command returns statistics about a collection from NFT Marketplaces. This data includes total supply, floor price, one day sales, one day average price, seven day sales, seven day average price, thirty day sales and thirty day average price.')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Usage', value: '`!scrape [name]`', inline: true },
                    { name: 'Arguments', value: '`name: collection slug (Eg: azuki)`', inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!help collection') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription('The collection command returns data about a collection from Opensea. This data includes contract details, data, as well as social media such as their twitter or discord.')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Usage', value: '`!collection [name]`', inline: true },
                    { name: 'Arguments', value: '`name: collection slug (Eg: azuki)`', inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!help sale') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription('The sale command returns the latest sale of a collection from Opensea. It includes data such as the price of the sale, the tokenId, the seller wallet and the buyer wallet.')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Usage', value: '`!sale [name]`', inline: true },
                    { name: 'Arguments', value: '`name: collection slug (Eg: azuki)`', inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!help listing') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription('The listing command returns the latest listing of a collection from Opensea. It includes data such as the buy now asking price of the listing and the tokenId.')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
  .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Usage', value: '`!listing [name]`', inline: true },
                    { name: 'Arguments', value: '`name: collection slug (Eg: azuki)`', inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!help trending') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription('The trending command returns the top 5 top collections over the last 7 days from Opensea. It includes data such as the collection name, the floor price, 7 day volume and 1 day volume, for each of the 5 collections.')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setFooter("Lumiere Tools", 'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                { name: 'Usage', value: '`!trending`', inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!help estimate') {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`, {
            headers: {
                'Accept': 'application/json',
            }
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription('The estimate command returns an estimate value of an NFT by finding the highest floor-price out of all of its traits. This is still experimental! It includes data such as the trait key, the trait value and the estimate price.')
                .setTitle('Lumiere Tools') .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Usage', value: '`!estimate [tokenid] [contract]`', inline: true },
                    { name: 'Arguments', value: '`tokenId: the tokenId of the NFT (Eg: Azuki #5432) `', inline: true },
                  { name: 'Arguments', value: '`contract: the contract address of the collection (Eg: Azuki contract: 0xed5af388653567af2f388e6224dc7c4b3241c544)) `', inline: false },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
});

client.login("TOKEN HERE");
