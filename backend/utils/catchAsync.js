function catchAsync(fun){
    return function(req,res,next){
        fn(req,res,next)
            .catch(e=>next(e))
    }
}