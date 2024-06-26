import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import css from './css/profiles.module.css';
import sprite from '../../../img/svg/sprite-icon.svg';

const Profiles = () => {
  const itemsPerPage = 8;

  const { accountId } = useParams();

  const [profilesData, setProfilesData] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jsonLoaded, setJsonLoaded] = useState(true);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(profilesData.length / itemsPerPage)
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    // Функция для загрузки файла JSON
    const fetchProfilesData = async () => {
      try {
        // Динамический импорт файла JSON в зависимости от accountId
        const { default: jsonData } = await import(
          `../../../path/to/profilesData/profiles${accountId}.json`
        );
        setProfilesData(jsonData);
        setJsonLoaded(true);
      } catch (error) {
        console.error('Error fetching profiles data:', error);
        setJsonLoaded(false);
      }
    };

    fetchProfilesData();
  }, [accountId]);

  let maxPageNumbersToShow;

  const filteredProfiles = useMemo(() => {
    return profilesData.filter(
      row =>
        row.profileId.toLowerCase().includes(filter.toLowerCase()) ||
        row.country.toLowerCase().includes(filter.toLowerCase()) ||
        row.marketplace.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, profilesData]);

  // Обновление totalPages
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
    setTotalPages(newTotalPages);
  }, [filter, filteredProfiles, itemsPerPage]);

  // Обновление currentPage
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, itemsPerPage, filteredProfiles, totalPages]);

  // Функция для сортировки данных
  const sortedData = sortConfig.key
    ? [...filteredProfiles].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    : filteredProfiles;

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
    <div className={css.profilesContainer}>
      <div className={css.profilesContainer__filterBoard}>
        <h1>Table Profiles</h1>
        {jsonLoaded ? (
          <p className={css.profilesContainer__filterBoard__ID}>
            ID{' '}
            <span className={css.profilesContainer__filterBoard__ID__number}>
              {accountId}
            </span>
          </p>
        ) : (
          <p className={css.profilesContainer__filterBoard__error}>
            Everything is fine. The site is working. I just haven't created a
            JSON file for the row you clicked on in the Accounts table. I have
            created a JSON file only for the first eight rows of the Accounts
            table. Please click on the back button and then select one of the
            first eight lines.
          </p>
        )}
        <Link to="/">
          <button
            type="button"
            className={
              !jsonLoaded ? css.profilesContainer__filterBoard__btn : ''
            }
          >
            back
          </button>
        </Link>
        <div className={css.profilesContainer__filterBoard__inputBox}>
          <svg
            width="24"
            height="24"
            className={css.profilesContainer__filterBoard__inputBox__svg}
          >
            <use xlinkHref={`${sprite}#search`} />
          </svg>
          <input
            type="text"
            value={filter}
            onChange={handleChangeName}
            placeholder="Search"
            className={css.profilesContainer__filterBoard__inputBox__input}
          />
        </div>
      </div>
      <table className={css.profilesContainer__table}>
        <thead>
          <tr className={css.profilesContainer__table__tr}>
            <th className={css.profilesContainer__table__tr__indentBgn}></th>
            <th
              className={css.profilesContainer__table__tr__th}
              onClick={() => requestSort('profileId')}
            >
              profileId
            </th>
            <th
              className={css.profilesContainer__table__tr__th}
              onClick={() => requestSort('country')}
            >
              country
            </th>
            <th
              className={css.profilesContainer__table__tr__th}
              onClick={() => requestSort('marketplace')}
            >
              marketplace
            </th>
            <th className={css.profilesContainer__table__tr__indentEnd}></th>
          </tr>
        </thead>

        <tbody>
          {displayItems.map(filteredProfile => (
            <tr key={filteredProfile.profileId}>
              <td></td>
              <td className={css.profilesContainer__table__td}>
                <Link
                  to={`/profiles/${accountId}/campaigns/${filteredProfile.profileId}`}
                >
                  {filteredProfile.profileId}
                </Link>
              </td>
              <td className={css.profilesContainer__table__td}>
                <Link
                  to={`/profiles/${accountId}/campaigns/${filteredProfile.profileId}`}
                >
                  {filteredProfile.country}
                </Link>
              </td>
              <td className={css.profilesContainer__table__td}>
                <Link
                  to={`/profiles/${accountId}/campaigns/${filteredProfile.profileId}`}
                >
                  {filteredProfile.marketplace}
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

export default Profiles;
