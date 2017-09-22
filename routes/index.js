module.exports = app => {

    /**
     * @api {get} / API Status
     * @apiGroup Status
     * @apiSuccess {String} status Mensagem de status da API
     * @apiSuccess {String} versao Versão da API
     * @apiVersion 1.0.0
     * @apiSampleRequest http://api.gerdata.com
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *      {
     *          status: 'Finance API',
     *          versao: '1.0'
     *      }
     */
    app.get("/", (req, res) => {
        res.json({
            status: 'Finance API',
            versao: '1.0'
        });
    });
};