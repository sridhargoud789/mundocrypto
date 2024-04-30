import AppsIcon from "@mui/icons-material/Apps";
import { Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dropdown, NavItem, NavLink, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const MegaMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink} bsPrefix="dt">
        <AppsIcon sx={{ width: 32, height: 32 }} />
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dashboard-dropdown dropdown-menu-start py-0"
        align="start"
        show
      >
        <Dropdown.Item className="mt-3 bg-white noBorderCard">
          <Table className="bg-white noBorderCard" borderless={true}>
            <tbody>
              <tr>
                <td className="p-0">
                  <Card className="noBorderCard p-0">
                    <CardHeader
                      avatar={
                        <img
                          src="/images_optimized/megamenu/Academy.svg"
                          width={48}
                        />
                      }
                      title={<span className="mm_title">Instructores</span>}
                      subheader={
                        <span className="mm_subtitle">
                          Conviértete en instructor
                        </span>
                      }
                      onClick={() => router.push("/Instructors")}
                    />
                  </Card>
                </td>
                <td className="p-0">
                  <Card className="noBorderCard">
                    <CardHeader
                      avatar={
                        <img
                          src="/images_optimized/megamenu/Collabs.svg"
                          width={48}
                        />
                      }
                      title={<span className="mm_title">Empresas</span>}
                      subheader={
                        <span className="mm_subtitle">
                          Academias para empresas B2B
                        </span>
                      }
                      onClick={() => router.push("/Business")}
                    />
                  </Card>
                </td>
              </tr>
              <tr>
                <td className="p-0">
                  <Card className="noBorderCard">
                    <CardHeader
                      avatar={
                        <img
                          src="/images_optimized/megamenu/News.svg"
                          width={48}
                        />
                      }
                      title={<span className="mm_title">Articulos</span>}
                      subheader={
                        <span className="mm_subtitle">Todos los articulos</span>
                      }
                      onClick={() => router.push("/articles")}
                    />
                  </Card>
                </td>
              </tr>
            </tbody>
          </Table>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default MegaMenu;
