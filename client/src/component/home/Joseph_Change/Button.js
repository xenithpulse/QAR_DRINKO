import styled from "styled-components";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 7px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReviewButton = () => {
  return (
    <Button>
      <a
        href="https://www.google.com/search?q=Fit+and+Drink+Water+Filter+Company+Doha&sca_esv=88f3ba43b8b69cfe&ei=FtwXZ4HqIu-7i-gPpO_VuA0&ved=0ahUKEwiBzZ2QvaKJAxXv3QIHHaR3FdcQ4dUDCA8&uact=5&oq=Fit+and+Drink+Water+Filter+Company+Doha&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ0ZpdCBhbmQgRHJpbmsgV2F0ZXIgRmlsdGVyIENvbXBhbnkgRG9oYTIIECEYoAEYwwQyCBAhGKABGMMESOlCUK0ZWPc8cAF4AJABAJgBlQOgAZ8RqgEHMi02LjEuMbgBA8gBAPgBAZgCBaACxwjCAgsQABiABBiwAxiiBMICChAhGKABGMMEGAqYAwCIBgGQBgWSBwkxLjAuMy4wLjGgB_IY&sclient=gws-wiz-serp#"
        target="_blank"
        rel="noopener noreferrer"
        style={{color: "inherit", textDecoration: "none" }}
      >
        Give us Review
      </a>
    </Button>
  );
};

export default ReviewButton;
