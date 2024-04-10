import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import css from './css/campaigns.module.css';
import sprite from '../../../../img/svg/sprite-icon.svg';

const Campaigns = () => {
  const itemsPerPage = 8;

  const { accountId, profilesId } = useParams();

  const [campaignsData, setCampaignsData] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jsonLoaded, setJsonLoaded] = useState(true);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(campaignsData.length / itemsPerPage)
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    // Функция для загрузки файла JSON
    const fetchCampaignsData = async () => {
      try {
        // Динамический импорт файла JSON в зависимости от accountId
        const { default: jsonData } = await import(
          `../../../../path/to/campaignsData/campaigns${profilesId}.json`
        );
        setCampaignsData(jsonData);
        setJsonLoaded(true);
      } catch (error) {
        console.error('Error fetching profiles data:', error);
        setJsonLoaded(false);
      }
    };

    fetchCampaignsData();
  }, [profilesId]);

  let maxPageNumbersToShow;

  const filteredCampaigns = useMemo(() => {
    return campaignsData.filter(
      row =>
        row.campaignId.toLowerCase().includes(filter.toLowerCase()) ||
        row.clicks.toString().includes(filter) ||
        row.cost.toFixed(2).toString().includes(filter) ||          
        row.date.includes(filter)        
      );
  }, [filter, campaignsData]);

  // Обновление totalPages
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    setTotalPages(newTotalPages);
  }, [filter, filteredCampaigns, itemsPerPage]);

  // Обновление currentPage
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, itemsPerPage, filteredCampaigns, totalPages]);

  // Функция для сортировки данных
  const sortedData = sortConfig.key
    ? [...filteredCampaigns].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    : filteredCampaigns;

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
    <div className={css.campaignsContainer}>
      <div className={css.campaignsContainer__filterBoard}>
        <h1>Table Campaigns</h1>
        {jsonLoaded ? (
          <p className={css.campaignsContainer__filterBoard__ID}>
            ID{' '}
            <span className={css.campaignsContainer__filterBoard__ID__number}>
              {profilesId}
            </span>
          </p>
        ) : (
          <p className={css.campaignsContainer__filterBoard__error}>
            Everything is fine. The site is working. I just haven't created a
            JSON file for the row you clicked on in the Accounts table. I have
            created a JSON file only for the first eight rows of the Accounts
            table. Please click on the back button and then select one of the
            first eight lines.
          </p>
        )}
        <Link to={`/profiles/${accountId}`}>
          <button
            type="button"
            className={
              !jsonLoaded ? css.campaignsContainer__filterBoard__btn : ''
            }
          >
            back
          </button>
        </Link>
        <div className={css.campaignsContainer__filterBoard__inputBox}>
          <svg
            width="24"
            height="24"
            className={css.campaignsContainer__filterBoard__inputBox__svg}
          >
            <use xlinkHref={`${sprite}#search`} />
          </svg>
          <input
            type="text"
            value={filter}
            onChange={handleChangeName}
            placeholder="Search"
            className={css.campaignsContainer__filterBoard__inputBox__input}
          />
        </div>
      </div>
      <table className={css.campaignsContainer__table}>
        <thead>
          <tr className={css.campaignsContainer__table__tr}>
            <th className={css.campaignsContainer__table__tr__indentBgn}></th>
            <th
              className={css.campaignsContainer__table__tr__th}
              onClick={() => requestSort('campaignId')}
            >
              campaignId
            </th>
            <th
              className={css.campaignsContainer__table__tr__th}
              onClick={() => requestSort('clicks')}
            >
              clicks
            </th>
            <th
              className={css.campaignsContainer__table__tr__th}
              onClick={() => requestSort('cost')}
            >
              cost (USD)
            </th>
            <th
              className={css.campaignsContainer__table__tr__th}
              onClick={() => requestSort('date')}
            >
              date
            </th>
            <th className={css.campaignsContainer__table__tr__indentEnd}></th>
          </tr>
        </thead>

        <tbody>
          {displayItems.map(filteredCampaign => (
            <tr key={filteredCampaign.campaignId}>
              <td></td>
              <td className={css.campaignsContainer__table__td}>
                {filteredCampaign.campaignId}
              </td>
              <td className={css.campaignsContainer__table__td}>
                {filteredCampaign.clicks}
              </td>
              <td className={css.campaignsContainer__table__td}>
                {filteredCampaign.cost}
              </td>
              <td className={css.campaignsContainer__table__td}>
                {filteredCampaign.date}
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

export default Campaigns;
