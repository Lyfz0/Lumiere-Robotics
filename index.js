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
    "X-API-KEY": "MODULE API KEY HERE"
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
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
       headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
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
})

client.on('messageCreate', async (messageCreate) => {
  if (messageCreate.content === '!trending') {
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=SEVEN_DAY_VOLUME&count=5&offset=0`, {
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
}
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('Top collections over the last 7 days')
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                  { name: '`Collection Name`', value: `[${response.data.rankings[0].collection_name}](https://opensea.io/collection/${response.data.rankings[0].collection_slug})`, inline: false },
                  { name: '`Floor Price`', value: `${JSON.stringify(Math.round(response.data.rankings[0].statistics.floor * 1000) /1000)}`, inline: true },
                  { name: '`7 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[0].statistics.sevenDayVolume * 1) /1)}`, inline: true },
                  { name: '`1 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[0].statistics.oneDayVolume* 1) /1)}`, inline: true },
                  { name: '`Collection Name`', value: `[${response.data.rankings[1].collection_name}](https://opensea.io/collection/${response.data.rankings[1].collection_slug})`, inline: false },
                  { name: '`Floor Price`', value: `${JSON.stringify(Math.round(response.data.rankings[1].statistics.floor * 1000) /1000)}`, inline: true },
                  { name: '`7 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[1].statistics.sevenDayVolume* 1) /1)}`, inline: true },
                  { name: '`1 Day Volume`', value: `(${JSON.stringify(Math.round(response.data.rankings[1].statistics.oneDayVolume* 1) /1)}`, inline: true },
                  { name: '`Collection Name`', value: `[${response.data.rankings[2].collection_name}](https://opensea.io/collection/${response.data.rankings[2].collection_slug})`, inline: false },
                  { name: '`Floor Price`', value: `${JSON.stringify(Math.round(response.data.rankings[2].statistics.floor * 1000) /1000)}`, inline: true },
                  { name: '`7 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[2].statistics.sevenDayVolume* 1) /1)}`, inline: true },
                  { name: '`1 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[2].statistics.oneDayVolume* 1) /1)}`, inline: true },
                  { name: '`Collection Name`', value: `[${response.data.rankings[3].collection_name}](https://opensea.io/collection/${response.data.rankings[3].collection_slug})`, inline: false },
                  { name: '`Floor Price`', value: `${JSON.stringify(Math.round(response.data.rankings[3].statistics.floor * 1000) /1000)}`, inline: true },
                  { name: '`7 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[3].statistics.sevenDayVolume* 1) /1)}`, inline: true },
                  { name: '`1 Day Volume`', value: `(${JSON.stringify(Math.round(response.data.rankings[3].statistics.oneDayVolume* 1) /1)}`, inline: true },
                  { name: '`Collection Name`', value: `[${response.data.rankings[4].collection_name}](https://opensea.io/collection/${response.data.rankings[4].collection_slug})`, inline: false },
                  { name: '`Floor Price`', value: `${JSON.stringify(Math.round(response.data.rankings[4].statistics.floor * 1000) /1000)}`, inline: true },
                  { name: '`7 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[4].statistics.sevenDayVolume* 1) /1)}`, inline: true },
                  { name: '`1 Day Volume`', value: `${JSON.stringify(Math.round(response.data.rankings[4].statistics.oneDayVolume* 1) /1)}`, inline: true },
                  )
                .setTimestamp()
            messageCreate.channel.send({embeds: [infoEmbed2]})
        })
    }
})


client.on('message', async (message) => {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    if(message.author.bot) return;
    if(cmd == "collection") { 
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/collection/info?type=${args[1]}`, {
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
}
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`Collection: ${response.data.collection}`)
                .setDescription(`${response.data.info.description}`)
                .setImage(`${response.data.info.bannerImageUrl}`)
                .setThumbnail(`${response.data.info.imageUrl}`)
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields()
                .addFields(
                  { name: '`Verified:`', value: `${response.data.info.isVerified}`, inline: true },
                  { name: '`Name:`', value: `${response.data.info.name}`, inline: true },
                  { name: '`Owner:`', value: `${response.data.info.owner.displayName}`, inline: true },
                  { name: '`Floor Price:`', value: `${JSON.stringify(Math.round(response.data.info.statistics.floorPrice.unit * 1000) /1000)}`, inline: true },
                  { name: '`Total Supply:`', value: `${response.data.info.statistics.totalSupply}`, inline: true },
                  { name: '`Social Media:`', value: `[Website](${response.data.info.externalUrl})\n[Discord](${response.data.info.discordUrl})\n[Twitter](https://twitter.com/${response.data.info.connectedTwitterUsername})`, inline: true },
                  )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed2]})
        })
    }
})


client.on('message', async (message) => {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    if(message.author.bot) return;
    if(cmd == "estimate") { 
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/token/value?tokenId=${args[1]}&collection=${args[2]}`, {
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
}
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`NFT Estimate:`)
                .setFooter('!!Experimental!!')
                .setDescription(`The bot estimate's the value of an NFT by finding the highest floor-price out of all of its traits.`)
              .setThumbnail('https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields()
                .addFields(
                  { name: '`Trait Key:`', value: `**${response.data.info.traitKey}**`, inline: true },
                  { name: '`Trait Value:`', value: `**${response.data.info.traitValue}**`, inline: true },
                  { name: '`Price:`', value: `**${response.data.info.price}**`, inline: true },
                  )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('message', async (message) => {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    if(message.author.bot) return;
    if(cmd == "listing") { 
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/listings/new-listings?type=${args[1]}&count=1&currencySymbol=ETH`, {
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
}
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`Latest Listing For ${response.data.collection}`)
                .setDescription('')
                .setImage(response.data.listings[0].image_url)
                .addFields()
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setURL(response.data.listings[0].permalink)
                .addFields(
                  { name: 'Price:', value: `${response.data.listings[0].price}`, inline: false },
                  { name: 'TokenId:', value: `${response.data.listings[0].tokenId}`, inline: false },
                )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('message', async (message) => {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    if(message.author.bot) return;
    if(cmd == "sale") { 
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/orders/sales?type=${args[1]}&count=20&currencySymbol=ETH`, {
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
}
            }).then(response => {
            console.log(response.data);
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`Latest Sale For ${response.data.collection}`)
                .setDescription('')
                .setImage(response.data.sales[0].image_url)
                .addFields()
                .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .setURL(response.data.sales[0].permalink)
                .addFields(
                  { name: 'Price:', value: `${response.data.sales[0].price}`, inline: false },
                  { name: 'TokenId:', value: `${response.data.sales[0].tokenId}`, inline: false },
                  { name: 'From:', value: `[${response.data.sales[0].from}](https://etherscan.io/address/${response.data.sales[0].from})`, inline: false },
                { name: 'To:', value: `[${response.data.sales[0].to}](https://etherscan.io/address/${response.data.sales[0].to})`, inline: false },
                )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed2]})
        })
    }
})

client.on('message', async (message) => {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    if(message.author.bot) return;
    if(cmd == "scrape") { 
        axios.get(`https://api.opensea.io/api/v1/collection/${args[1]}`, {
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULE API KEY HERE"
}
            }).then(response => {
            console.log(response.data);
            const infoEmbed = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle(response.data.collection.name)
                .setDescription('Stats (24 hours; 7 days; 30 days)')
                .setURL(response.data.collection.external_url)
                .setThumbnail(response.data.collection.image_url)
                .setImage(response.data.collection.large_image_url)
  .setFooter("Lumiere Tools",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
                .addFields(
                    { name: 'Total Quantity:', value: `${response.data.collection.stats.count}`, inline: false },
                    { name: 'Floor Price:', value: `${Math.round(response.data.collection.stats.floor_price * 1000) /1000}Ξ `, inline: false },
                    { name: 'One Day Sales:', value: `${response.data.collection.stats.one_day_sales}`, inline: false },
                    { name: 'One Day Average Price:', value: `${Math.round(response.data.collection.stats.one_day_average_price * 1000) /1000}Ξ | ${Math.round(response.data.collection.stats.one_day_change* 1000) /1000}%`, inline: false },
                    { name: 'Seven Day Sales:', value: `${response.data.collection.stats.seven_day_sales}`, inline: false },
                    { name: 'Seven Day Average Price:', value: `${Math.round(response.data.collection.stats.seven_day_average_price * 1000) /1000}Ξ | ${Math.round(response.data.collection.stats.seven_day_change* 1000) /1000}%`, inline: false },
                    { name: 'Thirty Day Sales:', value: `${response.data.collection.stats.thirty_day_sales}`, inline: false },
                    { name: 'Thirty Day Average price:', value: `${Math.round(response.data.collection.stats.thirty_day_average_price * 1000) /1000}Ξ | ${Math.round(response.data.collection.stats.thirty_day_change* 1000) /1000}%`, inline: false },
                )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed]})
        }).catch(function (error) {
        // Catch errors
        if (error.response) {
            let errorMessage = notFoundError;
            // If statuscode is different from 404, send the statuscode to the user.
            if (error.response.status !== 404) {
                errorMessage = `:monkey_face: **${error.response.status}** Please try again later.`;
            }
            // Send error message
            message.channel.send(`${errorMessage}`);
        } else if (error.request) {
            message.channel.send(`:monkey_face: **Request Error**`);
        } else {
            message.channel.send(`:monkey_face: **${error.message}**`);
        }
    })
}
});

client.login("TOKEN HERE");
