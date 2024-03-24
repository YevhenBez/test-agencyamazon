import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import listAccounts from '../../path/to/accounts.json';
import css from './css/accounts.module.css';
import sprite from '../../img/svg/sprite-icon.svg';

const Accounts = () => {
  const itemsPerPage = 8;

  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(listAccounts.length / itemsPerPage)
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  let maxPageNumbersToShow;

  const filteredAccounts = useMemo(() => {
    return listAccounts.filter(
      row =>
        row.id.toLowerCase().includes(filter.toLowerCase()) ||
        row.email.toLowerCase().includes(filter.toLowerCase()) ||
        row.authToken.toLowerCase().includes(filter.toLowerCase()) ||
        row.creationDate.includes(filter)
    );
  }, [filter]);

  // Обновление totalPages
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
    setTotalPages(newTotalPages);
  }, [filter, filteredAccounts, itemsPerPage]);

  // Обновление currentPage
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, itemsPerPage, filteredAccounts, totalPages]);

  // Функция для сортировки данных
  const sortedData = sortConfig.key
    ? [...filteredAccounts].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    : filteredAccounts;

  const displayItems = useMemo(() => {
    return sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, sortedData]);

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
  };

  // Функция для изменения столбца сортировки и направления
  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={css.accountsContainer}>
      <div className={css.accountsContainer__filterBoard}>
        <h1>Table Accounts</h1>

        <div className={css.accountsContainer__filterBoard__inputBox}>
          <svg
            width="24"
            height="24"
            className={css.accountsContainer__filterBoard__inputBox__svg}
          >
            <use xlinkHref={`${sprite}#search`} />
          </svg>
          <input
            type="text"
            value={filter}
            onChange={handleChangeName}
            placeholder="Search"
            className={css.accountsContainer__filterBoard__inputBox__input}
          />
        </div>
      </div>
      <table className={css.accountsContainer__table}>
        <thead>
          <tr className={css.accountsContainer__table__tr}>
            <th className={css.accountsContainer__table__tr__indentBgn}></th>
            <th
              className={css.accountsContainer__table__tr__th}
              onClick={() => requestSort('accountId')}
            >
              accountId
            </th>
            <th
              className={css.accountsContainer__table__tr__th}
              onClick={() => requestSort('email')}
            >
              email
            </th>
            <th
              className={css.accountsContainer__table__tr__th}
              onClick={() => requestSort('authToken')}
            >
              authToken
            </th>
            <th
              className={css.accountsContainer__table__tr__th}
              onClick={() => requestSort('creationDate')}
            >
              creationDate
            </th>
            <th className={css.accountsContainer__table__tr__indentEnd}></th>
          </tr>
        </thead>

        <tbody>
          {displayItems.map(filteredAccount => (
            <tr key={filteredAccount.id}>
              <td></td>
              <td className={css.accountsContainer__table__td}>
                <Link to={`/profiles/${filteredAccount.id}`}>
                  {filteredAccount.id}
                </Link>
              </td>
              <td className={css.accountsContainer__table__td}>
                <Link to={`/profiles/${filteredAccount.id}`}>
                  {filteredAccount.email}
                </Link>
              </td>
              <td className={css.accountsContainer__table__td}>
                <Link to={`/profiles/${filteredAccount.id}`}>
                  {filteredAccount.authToken}
                </Link>
              </td>
              <td className={css.accountsContainer__table__td}>
                <Link to={`/profiles/${filteredAccount.id}`}>
                  {filteredAccount.creationDate}
                </Link>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
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

export default Accounts;
