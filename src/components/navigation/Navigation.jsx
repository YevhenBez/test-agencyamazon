import { NavLink } from 'react-router-dom';
import css from '../../components/navigation/css/navigation.module.css';
import sprite from '../../img/svg/sprite-icon.svg';

const Navigation = () => {
  return (
    <nav>
      <ul className={css.ul}>
        <li className={css.ul__li}>
          <NavLink to="/other" className={css.ul__li__navLink}>
            <button type="button" className={css.ul__li__navLink__btn}>
              <svg
                width="24"
                height="24"
                className={css.ul__li__navLink__btn__bgnSvg}
              >
                <use xlinkHref={`${sprite}#key-square`} />
              </svg>
              Dashboard
            </button>
          </NavLink>
        </li>
        <li className={css.ul__li}>
          <NavLink to="/other" className={css.ul__li__navLink}>
            <button type="button" className={css.ul__li__navLink__btn}>
              <svg
                width="24"
                height="24"
                className={css.ul__li__navLink__btn__bgnSvg}
              >
                <use xlinkHref={`${sprite}#volumetric-square`} />
              </svg>
              Product
              <svg
                width="16"
                height="16"
                className={css.ul__li__navLink__btn__endSvg}
              >
                <use xlinkHref={`${sprite}#chevron-right`} />
              </svg>
            </button>
          </NavLink>
        </li>
        <li className={css.ul__li}>
          <NavLink to="/" className={css.ul__li__navLink}>
            <button type="button" className={css.ul__li__navLink__btn}>
              <svg
                width="24"
                height="24"
                className={css.ul__li__navLink__btn__bgnSvg__customers}
              >
                <use xlinkHref={`${sprite}#user-square`} />
              </svg>
              Customers
              <svg
                width="16"
                height="16"
                className={css.ul__li__navLink__btn__endSvg}
              >
                <use xlinkHref={`${sprite}#chevron-right`} />
              </svg>
            </button>
          </NavLink>
        </li>
        <li className={css.ul__li}>
          <NavLink to="/other" className={css.ul__li__navLink}>
            <button type="button" className={css.ul__li__navLink__btn}>
              <svg
                width="24"
                height="24"
                className={css.ul__li__navLink__btn__bgnSvg}
              >
                <use xlinkHref={`${sprite}#wallet-money`} />
              </svg>
              Income
              <svg
                width="16"
                height="16"
                className={css.ul__li__navLink__btn__endSvg}
              >
                <use xlinkHref={`${sprite}#chevron-right`} />
              </svg>
            </button>
          </NavLink>
        </li>
        <li className={css.ul__li}>
          <NavLink to="/other" className={css.ul__li__navLink}>
            <button type="button" className={css.ul__li__navLink__btn}>
              <svg
                width="24"
                height="24"
                className={css.ul__li__navLink__btn__bgnSvg}
              >
                <use xlinkHref={`${sprite}#discount-shape`} />
              </svg>
              Promote
              <svg
                width="16"
                height="16"
                className={css.ul__li__navLink__btn__endSvg}
              >
                <use xlinkHref={`${sprite}#chevron-right`} />
              </svg>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/other" className={css.ul__li__navLink}>
            <button type="button" className={css.ul__li__navLink__btn}>
              <svg
                width="24"
                height="24"
                className={css.ul__li__navLink__btn__bgnSvg}
              >
                <use xlinkHref={`${sprite}#message-question`} />
              </svg>
              Help
              <svg
                width="16"
                height="16"
                className={css.ul__li__navLink__btn__endSvg}
              >
                <use xlinkHref={`${sprite}#chevron-right`} />
              </svg>
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
