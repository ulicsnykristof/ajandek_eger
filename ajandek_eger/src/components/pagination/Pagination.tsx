function Pagination(props: any) {
  return (
    <>
      <nav className="termek-table-pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" onClick={props.goToPrevPage} href="#">
              Előző
            </a>
          </li>
          {props.pageNumbers.map((pgNumber: any) => (
            <li
              key={pgNumber}
              className={`page-item ${
                props.currentPage == pgNumber ? "active" : ""
              } `}
            >
              <a
                onClick={() => props.setCurrentPage(pgNumber)}
                className="page-link"
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" onClick={props.goToNextPage} href="#">
              Következő
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
