import React, { useState, useEffect, useMemo } from 'react';
import listCustomers from '../../path/to/customers.json';
import css from '../../pages/customers/css/customers.module.css';
import sprite from '../../img/svg/sprite-icon.svg';

const Customers = () => {
  const itemsPerPage = 8;

  const [filter, setFilter] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(listCustomers.length / itemsPerPage)
  );

  let maxPageNumbersToShow;

  const filteredCustomers = useMemo(() => {
    return listCustomers.filter(
      row =>
        row.name.toLowerCase().includes(filter.toLowerCase()) ||
        row.company.toLowerCase().includes(filter.toLowerCase()) ||
        row.phone.includes(filter) ||
        row.email.toLowerCase().includes(filter.toLowerCase()) ||
        row.country.toLowerCase().includes(filter.toLowerCase()) ||
        row.status.includes(filter)
    );
  }, [filter]);

  // Обновление totalPages
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    setTotalPages(newTotalPages);
  }, [filter, filteredCustomers, itemsPerPage]);

  // Обновление currentPage
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, itemsPerPage, filteredCustomers, totalPages]);

  const displayItems = useMemo(() => {
    return filteredCustomers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredCustomers]);

  maxPageNumbersToShow = totalPages > 3 ? 4 : totalPages;

  const handleClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 2;
    let endPage = currentPage + 1;

    if (startPage <= 0) {
      startPage = 1;
      endPage = startPage + maxPageNumbersToShow - 1;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxPageNumbersToShow + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleChangeName = event => {
    setFilter(event.currentTarget.value);
    setCurrentPage(1);

    if (event.currentTarget.value !== 'Active') {
      setIsFocused(true);
    }

    if (event.currentTarget.value === 'Active') {
      setIsFocused(false);
    }
  };

  return (
    <div className={css.customersContainer}>
      <div className={css.customersContainer__filterBoard}>
        <div className={css.customersContainer__filterBoard__btns}>
          <button
            className={
              isFocused
                ? css.customersContainer__filterBoard__btns__all
                : css.customersContainer__filterBoard__btns__allBlur
            }
            onClick={() => {
              setFilter('');
              setCurrentPage(1);
            }}
            onFocus={() => setIsFocused(true)}
          >
            All Customers
          </button>
          <button
            className={
              !isFocused
                ? css.customersContainer__filterBoard__btns__active
                : css.customersContainer__filterBoard__btns__activeBlur
            }
            onClick={() => {
              setFilter('Active');
              setCurrentPage(1);
            }}
            onFocus={() => setIsFocused(false)}
          >
            Active Members
          </button>
        </div>
        <div className={css.customersContainer__filterBoard__inputBox}>
          <svg
            width="24"
            height="24"
            className={css.customersContainer__filterBoard__inputBox__svg}
          >
            <use xlinkHref={`${sprite}#search`} />
          </svg>
          <input
            type="text"
            value={filter}
            onChange={handleChangeName}
            placeholder="Search"
            className={css.customersContainer__filterBoard__inputBox__input}
          />
        </div>
      </div>
      <table className={css.customersContainer__table}>
        <thead>
          <tr className={css.customersContainer__table__tr}>
            <th className={css.customersContainer__table__tr__indentBgn}></th>
            <th className={css.customersContainer__table__tr__th}>
              Customer Name
            </th>
            <th className={css.customersContainer__table__tr__th}>Company</th>
            <th className={css.customersContainer__table__tr__th}>
              Phone Number
            </th>
            <th className={css.customersContainer__table__tr__th}>Email</th>
            <th className={css.customersContainer__table__tr__th}>Country</th>
            <th className={css.customersContainer__table__tr__thStatus}>
              Status
            </th>
            <th className={css.customersContainer__table__tr__indentEnd}></th>
          </tr>
        </thead>

        {filter ? (
          <tbody>
            {displayItems.map(filteredCustomer => (
              <tr key={filteredCustomer.id}>
                <td></td>
                <td className={css.customersContainer__table__td}>
                  {filteredCustomer.name}
                </td>
                <td className={css.customersContainer__table__td}>
                  {filteredCustomer.company}
                </td>
                <td className={css.customersContainer__table__td}>
                  {filteredCustomer.phone}
                </td>
                <td className={css.customersContainer__table__td}>
                  {filteredCustomer.email}
                </td>
                <td className={css.customersContainer__table__td}>
                  {filteredCustomer.country}
                </td>
                <td className={css.customersContainer__table__tdStatus}>
                  <div
                    className={
                      filteredCustomer.status === 'Inactive'
                        ? css.customersContainer__table__tdStatus__inactive
                        : css.customersContainer__table__tdStatus__active
                    }
                  >
                    {filteredCustomer.status}
                  </div>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {displayItems.map(listCustomer => (
              <tr key={listCustomer.id}>
                <td></td>
                <td className={css.customersContainer__table__td}>
                  {listCustomer.name}
                </td>
                <td className={css.customersContainer__table__td}>
                  {listCustomer.company}
                </td>
                <td className={css.customersContainer__table__td}>
                  {listCustomer.phone}
                </td>
                <td className={css.customersContainer__table__td}>
                  {listCustomer.email}
                </td>
                <td className={css.customersContainer__table__td}>
                  {listCustomer.country}
                </td>
                <td className={css.customersContainer__table__tdStatus}>
                  <div
                    className={
                      listCustomer.status === 'Inactive'
                        ? css.customersContainer__table__tdStatus__inactive
                        : css.customersContainer__table__tdStatus__active
                    }
                  >
                    {listCustomer.status}
                  </div>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div>
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        {currentPage > 3 && totalPages > 4 && (
          <button onClick={() => handleClick(1)}>1</button>
        )}
        {currentPage > 3 && totalPages > 4 && <span>...</span>}
        {generatePageNumbers().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            style={{
              backgroundColor: pageNumber === currentPage ? 'blue' : 'grey',
            }}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages - 1 && totalPages > 4 && <span>...</span>}
        {currentPage < totalPages - 1 && totalPages > 4 && (
          <button onClick={() => handleClick(totalPages)}>{totalPages}</button>
        )}
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default Customers;
