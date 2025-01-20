class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // FILTER
  filter() {
    const queryObj = { ...this.queryStr };
    const excludedQuery = ["page", "fields", "limit", "sort"];
    excludedQuery.forEach((el) => delete queryObj[el]);
    let filterStr = JSON.stringify(queryObj);
    filterStr = filterStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(filterStr));
    return this;
  }
  //SORT
  sort() {
    if (this.queryStr.sort) {
      const sort = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  // Field Limit
  fieldLimit() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  // PAGINATION
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
