class ApiFeatures{

    constructor(query,querystr)
    {
        this.query=query;
        this.querystr=querystr;
    }

    search()
    {
        if(this.querystr.bookname)
        {
            const {bookname}=this.querystr;
            this.query=this.query.find({bookname});
        }
        if(this.querystr.genre)
        {
            const {genre}=this.querystr
        this.query=this.query.find({genre});
        }
        return this;
    }
    filter()
    {
        const querycopy={...this.querystr}

        const removeFields=["bookname","genre","page","limit","priceSort"];

        removeFields.forEach((key)=>{
            delete querycopy[key]
        })

        let querystr=JSON.stringify(querycopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);

        this.query=this.query.find(JSON.parse(querystr));
        return this;
    }
    sort()
    {
        if(this.querystr.priceSort)
        {
            const order=Number(this.querystr.priceSort)||0;
            this.query=this.query.sort({price:order});
        }
        return this;
    }
    pagination(resultPerPage)
    {
        const currentPage=Number(this.querystr.page)||1;

        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports=ApiFeatures;