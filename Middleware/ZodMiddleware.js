const validate = (schema)=> async(req, res, next)   => {
    try {
        await schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        })
        return next()
    } catch (error) {
        return res.status(400).json({
            err: error.errors})
    }
}

module.exports = validate