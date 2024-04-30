import { useRouter } from "next/router";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useTranslation } from "react-i18next";
import { getCourseList } from "../../services/nodeapi";

const LiveSearch = () => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const router = useRouter();

  const handleSearch = async (query) => {
    setIsLoading(true);
    const resp = await getCourseList(query);
    setOptions(resp.data.category);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    window.location.href = "/CourseDetail/" + e;
  };
  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey={(option) => `${option.name}`}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder={t("search_courses")}
      className="livesearch"
      renderMenuItemChildren={(option) => (
        <div onClick={() => handleChange(option.id)}>
          <img
            alt={option.name}
            src={option.signed_url_image}
            style={{
              marginRight: "10px",
              width: "100px",
            }}
          />
          <span>{option.name}</span>
        </div>
      )}
    />
  );
};

export default LiveSearch;
