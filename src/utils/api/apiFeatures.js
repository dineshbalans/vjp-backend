class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.keyword) {
      this.query = this.query.find({
        status: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      });
    }
    return this;
  }

  sortWithDate() {
    if (this.queryStr.from && this.queryStr.to) {
      const parts = this.queryStr.from.split("-");
      const fromDate = new Date(parts[2], parts[1] - 1, parts[0]);

      const toDate = new Date(this.queryStr.to);

      if (fromDate < toDate) {
        this.query = this.query.find({
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        });
      }
    }

    this.query = this.query.sort({ createdAt: -1 });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryStrCopy[field]);

    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
