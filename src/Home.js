import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import Slider from 'react-slick';
import Navbar from './Navbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [data, setData] = useState([]);
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const api = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=0947a1ca99724eb195124bdc849677d8');
      const articles = api.data.articles;
      setData(articles);
      console.log(api);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('done');
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  const [cat, setCat] = useState('general');
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState('us');

  useEffect(() => {
    receive();
  },[cat, country]);

  async function receive() {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${cat}&apiKey=0947a1ca99724eb195124bdc849677d8`
      );
      const info = res.data.articles;
      setNews(info);
    } catch (err) {
      console.log(err);
    }
  }

  function gen(e) {
    console.log(e);
    const n = e.target.innerHTML;
    setCat(n);
  }

  function city(e) {
    const m = e.target.innerHTML;
    setCountry(m);
  }

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: true,
    arrows: true,
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <div className='section-one'>
          <div className='headings'>
            <h2>Top News Headings</h2>
          </div>

          {data.length > 0 && (
            <div key={Index} className='card'>
              {data[Index].urlToImage ? (
                <div className='img-wrap'>
                  <img src={data[Index].urlToImage} alt='news-pic' />
                </div>
              ) : (
                'Picture Not Available'
              )}
              <div className='des'>
                <h2>{data[Index].title}</h2>
                {data[Index].description !== null ? (
                  <p>
                    {data[Index].description.length > 250
                      ? data[Index].description.substring(0, 250) + '....'
                      : data[Index].description}
                  </p>
                ) : (
                  <p>No Description</p>
                )}
                <p className='read-more'>
                  <a href={data[Index].url}>See more</a>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='two'>
          <div className='cat'>
            <ul className='list'>
              <p className='topic'>See news topic wise</p>
              <li onClick={gen} className={cat === 'business' ? 'selected' : ''}>
                business
              </li>
              <li onClick={gen} className={cat === 'technology' ? 'selected' : ''}>
                technology
              </li>
              <li onClick={gen} className={cat === 'science' ? 'selected' : ''}>
                science
              </li>
              <li onClick={gen} className={cat === 'entertainment' ? 'selected' : ''}>
                entertainment
              </li>
              <li onClick={gen} className={cat === 'sports' ? 'selected' : ''}>
                sports
              </li>
            </ul>
            <ul className='list-2'>
              <p className='topic'>See news country wise: us-United state, in-India</p>
              <li onClick={city} className={country === 'us' ? 'selected' : ''}>
                us
              </li>
              <li onClick={city} className={country === 'in' ? 'selected' : ''}>
                in
              </li>
              <li onClick={city} className={country === 'eg' ? 'selected' : ''}>
                eg
              </li>
              <li onClick={city} className={country === 'ch' ? 'selected' : ''}>
                ch
              </li>
              <li onClick={city} className={country === 'ru' ? 'selected' : ''}>
                ru
              </li>
              <li onClick={city} className={country === 'sa' ? 'selected' : ''}>
                sa
              </li>
            </ul>
          </div>

          <div className='car'>
            <Slider {...settings} className='slider'>
              {news.map((item, index) => (
                <div key={index} className='panel'>
                  <div className='wrap'>
                    <img src={item.urlToImage} alt='pic' className='n-pic' />
                  </div>
                  <h5 className='head'>{item.title}</h5>
                  {item.description !== null ? (
                    <p className='para-2'>
                      {item.description.length > 80
                        ? item.description.substring(0, 80) + '....'
                        : item.description}
                    </p>
                  ) : (
                    <p>No Description</p>
                  )}
                  <p className='read-more-2'>
                    <a href={item.url}>See more</a>
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
