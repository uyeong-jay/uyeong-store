export const filterSearch = ({ router, page, category, sort, search }) => {
  //router기능 변수에 담기
  const path = router.pathname;
  const query = router.query;

  //ex) http://localhost:3000/?page=2
  // console.log(path, query, page); // "/", page, 2

  //변수 query에 담기
  if (page) query.page = page;
  if (category) query.category = category;
  if (search) query.search = search;
  if (sort) query.sort = sort;

  //router에 적용
  router.push({
    pathname: path,
    query: query,
  });
};
