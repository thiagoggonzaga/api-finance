module.exports = app => {
    if (process.env.NODE_ENV !== 'test') {

        app.db.sequelize.sync({ force: false }).then(() => {
            console.log("Base atualizada!");
        }).catch(error => {
            console.log("Erro ao tentar atualizar base de dados.")
        }).done(() => {
            app.listen(app.get("port"), () => {
                console.log(`Finance API - Ativa na Porta ${app.get("port")}`);
            });
        });
    }
}