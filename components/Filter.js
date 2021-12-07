import { useState } from "react";
import { useRouter } from "next/router";
import { filterSearch } from "../utils/filterSearch";

const Filter = ({ state }) => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const router = useRouter();

  const { categories } = state;

  const onChangeCategory = (e) => {
    setCategory(e.currentTarget.value); //저장
    filterSearch({ router, category: e.currentTarget.value }); //router에 전달
  };

  const onChangeSort = (e) => {
    setSort(e.currentTarget.value); //저장
    filterSearch({ router, sort: e.currentTarget.value }); //router에 전달
  };

  //버튼 검색
  const onSubmitSearch = (e) => {
    e.preventDefault();
    filterSearch({ router, search: search ? search.toLowerCase() : "all" }); //router에 전달
    setSearch("");
  };

  //실시간 검색
  // useEffect(() => {
  //   filterSearch({ router, search: search ? search.toLowerCase() : "all" }); //router에 전달
  // }, [search]);

  return (
    <div className="input-group">
      {/* category */}
      <div className="input-group-prepend col-md-2 mt-3 px-1">
        <select
          className="custom-select text-capitalize"
          value={category}
          onChange={onChangeCategory}
        >
          <option value="all">Category</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* sort */}
      <div className="input-group-prepend col-md-2 mt-3 px-1">
        <select
          className="custom-select text-capitalize"
          value={sort}
          onChange={onChangeSort}
        >
          <option value="-createAt">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: Hight-Low</option>
          <option value="price">Price: Low-Hight</option>
        </select>
      </div>

      {/* search */}
      <form className="col-md-8 mt-3 px-1" onSubmit={onSubmitSearch}>
        <input
          className="form-control"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search Product"
        />
        <button style={{ display: "none" }} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Filter;
