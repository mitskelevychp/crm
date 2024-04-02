import { useEffect, ComponentType } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CREATE_COMPANY } from "../endpoints/endpoints";

interface UserType {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
  _id: string;
}

interface CompanyPageProps {
  user: UserType | null;
}

function withAuthCompanyPage<T extends CompanyPageProps>(
  WrappedComponent: ComponentType<T>
) {
  return function (props: T) {
    const { user } = props;
    const { itemNo } = useParams<{ itemNo: string }>();
    const navigate = useNavigate();

    useEffect(() => {
      if (user?.mainUser) {
        return;
      }
      // Припустимо, ваші компанії мають унікальний ідентифікатор у URL
      if (user) {
        axios
          .get(`${CREATE_COMPANY}/${itemNo}`)
          .then((response) => {
            const company = response.data;
            // Тут перевіряємо, чи login користувача відповідає категорії компанії
            if (company.categories !== user.login) {
              navigate("/user"); // Або інший URL, куди ви хочете перенаправити
            }
          })
          .catch((error) => {
            console.error("Помилка при отриманні даних компанії:", error);
            navigate("/user"); // Перенаправляємо, якщо є помилка
          });
      } else {
        // Якщо користувач не залогінений, перенаправляємо на логін
        navigate("/user");
      }
    }, [user, itemNo, navigate]);

    // Показуємо компонент, лише якщо перевірка пройшла
    return user ? <WrappedComponent {...props} /> : null;
  };
}

export default withAuthCompanyPage;
