module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        if (member.user.bot) return;
        if (member.partial) await member.fetch();
        
        member.roles.add(client.utils.config.memberRole);
    }
}