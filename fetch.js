fetch("https://backend.playliner.com/api/news/getVersions", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNmI4YTljZjRlM2FlYWEwNWQxNjJmMTQwMDNjYzI4NjFlM2RmN2Q4MmE3MWQwMTJkMTI2NDQxY2JjN2VkNTgyZjE5Mjc5YjRhYjg2MTI5MDMiLCJpYXQiOjE3Njk5NDA2MzcuMTg3OTU5LCJuYmYiOjE3Njk5NDA2MzcuMTg3OTYxLCJleHAiOjE3NzI1MDMyMDAuMjcyNjg2LCJzdWIiOiIxODIyMyIsInNjb3BlcyI6W119.QSgfI1Ss5aq_YpDt4kMBAmrTcaS7fNraJn0FvkxLfrXYvJSOFthc5_h83K9u2AuByCvO6vN6PN_Ksn4FYtttKU-vbl4mhwCeL3lqQOAjq3Bl4UJ-LP66VXaa9QYFCktoVtIvfp76Qpr32lUOoRW5kEMyloG3WyUIYpkMT6Pj1aC-q_1y8bS7O_1S2beDFaKz9EGiHqMlcDeS_i_b7SnTZBcR5slM4AFbm_fvHTBWx4h1jTTYykUAJla6hDOvLmU-wSqK5ebhUY9VEMsSAG42nuhVaBHcpTnHIdIaR572wZzf6b4e1eeq-K85UKNqPDiYZTmNjM_uOm9HAfCRAczaPQ8KGVSFqzB1o_94XNVPvIzYtnrz2Tz607pXD5N_xoS7g-SAGZCH2lBF_40tG-wkgJ5ITSEx6EGRIF_EQz6chYpEpEErAWbjoACQpKRPOL8Eeg5Q1Z6KKPjeD3nlT-Hzgku4-BqEusw2hQUXk4OfaSb4kNhQZsJ9ZlP5eNPpuhov56t3aUnD1KlqSH7S9Ke0T0HAe_1-Mr6jFre_ZaKFbb8XTdP7o1pfvbGNbN0cM_rq6uiIHpaV6mNXSkjrI92Zsygjlbry_X9EVrWVvgvtqAdyiwZDJBPYpbYosLNwXgXOL9UmdiRPxxY1NIsnRE0oYSXKHIlHKZDNYlyRcqwJTh8",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://saas.playliner.com/"
  },
  "body": "{\"newsId\":839209,\"lang\":\"en\"}",
  "method": "POST"
});

fetch("https://backend.playliner.com/api/news/getFull", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNmI4YTljZjRlM2FlYWEwNWQxNjJmMTQwMDNjYzI4NjFlM2RmN2Q4MmE3MWQwMTJkMTI2NDQxY2JjN2VkNTgyZjE5Mjc5YjRhYjg2MTI5MDMiLCJpYXQiOjE3Njk5NDA2MzcuMTg3OTU5LCJuYmYiOjE3Njk5NDA2MzcuMTg3OTYxLCJleHAiOjE3NzI1MDMyMDAuMjcyNjg2LCJzdWIiOiIxODIyMyIsInNjb3BlcyI6W119.QSgfI1Ss5aq_YpDt4kMBAmrTcaS7fNraJn0FvkxLfrXYvJSOFthc5_h83K9u2AuByCvO6vN6PN_Ksn4FYtttKU-vbl4mhwCeL3lqQOAjq3Bl4UJ-LP66VXaa9QYFCktoVtIvfp76Qpr32lUOoRW5kEMyloG3WyUIYpkMT6Pj1aC-q_1y8bS7O_1S2beDFaKz9EGiHqMlcDeS_i_b7SnTZBcR5slM4AFbm_fvHTBWx4h1jTTYykUAJla6hDOvLmU-wSqK5ebhUY9VEMsSAG42nuhVaBHcpTnHIdIaR572wZzf6b4e1eeq-K85UKNqPDiYZTmNjM_uOm9HAfCRAczaPQ8KGVSFqzB1o_94XNVPvIzYtnrz2Tz607pXD5N_xoS7g-SAGZCH2lBF_40tG-wkgJ5ITSEx6EGRIF_EQz6chYpEpEErAWbjoACQpKRPOL8Eeg5Q1Z6KKPjeD3nlT-Hzgku4-BqEusw2hQUXk4OfaSb4kNhQZsJ9ZlP5eNPpuhov56t3aUnD1KlqSH7S9Ke0T0HAe_1-Mr6jFre_ZaKFbb8XTdP7o1pfvbGNbN0cM_rq6uiIHpaV6mNXSkjrI92Zsygjlbry_X9EVrWVvgvtqAdyiwZDJBPYpbYosLNwXgXOL9UmdiRPxxY1NIsnRE0oYSXKHIlHKZDNYlyRcqwJTh8",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://saas.playliner.com/"
  },
  "body": "{\"newsId\":839209,\"lang\":\"en\"}",
  "method": "POST"
});