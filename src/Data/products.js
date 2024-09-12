
const products = [
    {
      id: 1,
      name: "Apple AirPods (2nd Generation) Case, White",
      price: "3,000",
      actualRate: "5,000",
      image: "https://i.pinimg.com/564x/94/0d/c2/940dc29ad1e28ad0e494633a5ea58d55.jpg",
      banner: "https://medias.utsavfashion.com/media/wysiwyg/promotions/2023/2610/luxe-designer-wear-new.jpg"
      
    },
    {
      id: 2,
      name: "Warm Men's Slippers for Winter",
      price: "2,500",
      actualRate:"3,000",
      image: "https://i.pinimg.com/564x/53/50/bd/5350bd3161724df3f4b3aec15f77af3b.jpg",
      banner: "https://t4.ftcdn.net/jpg/03/05/29/67/360_F_305296774_CYiMv2y87U27SoKT2o2OZFWzUzF8JPrL.jpg"
    },
    {
      id: 3,
      name: "Silicone Watchband Apple Watch",
      price: "1,000",
      actualRate: "1,499",
      image: "https://i.pinimg.com/564x/42/92/e8/4292e80a65af20990dd272f8372e6fbf.jpg",
      banner: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7bb49d2a-8588-41e7-9081-342339bfb37d/ddl95sj-4f2dc038-52f4-4369-8ce2-977c63d427eb.jpg/v1/fill/w_1024,h_284,q_75,strp/men_s_fashion__banner_by_asimcarnage_ddl95sj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdiYjQ5ZDJhLTg1ODgtNDFlNy05MDgxLTM0MjMzOWJmYjM3ZFwvZGRsOTVzai00ZjJkYzAzOC01MmY0LTQzNjktOGNlMi05NzdjNjNkNDI3ZWIuanBnIiwiaGVpZ2h0IjoiPD0yODQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC83YmI0OWQyYS04NTg4LTQxZTctOTA4MS0zNDIzMzliZmIzN2RcL2FzaW1jYXJuYWdlLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.ktKYKsraKd0YmHxi2mHLJfVcWFbkYW687jM82VjT2sU"
    },
    {
        id: 4,
        name: "MOVSSOU E7 Active Noise Cancelling Headphones",
        price: "10,000",
        actualRate: "11,000",
        image: "https://i.pinimg.com/236x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg",
        banner: "https://t3.ftcdn.net/jpg/02/11/28/00/360_F_211280049_g8nsjnEXE2383rW14OQ64Rg2WPANojKK.jpg"
      },
      {
        id: 5,
        name: "LED Lamp Bluetooth Speake Wireless Charger Atmosphere",
        price: "2,499",
        actualRate: "2,999",
        image: "https://i.pinimg.com/564x/9a/8e/ef/9a8eefa53c92e3ee4952773a979950c1.jpg",
        banner: "https://fashionclinik.com/wp-content/themes/yootheme/cache/eb/Fashion-home-banner-eb944ea1.jpeg"
      },
      {
        id: 6,
        name: "AMen's Loose Hip Hop Hooded Sweatshirt",
        price: "999",
        actualRate: "1,499",
        image: "https://i.pinimg.com/564x/19/42/38/194238bb3e6e667792d25b37537c0b5b.jpg",
        banner: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf180e2d-5bea-4aeb-8aba-9ea2f09e7aef/deu2up6-8d45c200-e05d-4c5d-b45b-05d01acfc429.jpg/v1/fill/w_1280,h_720,q_75,strp/fashion_sale_web_banner_by_koshaldesign_deu2up6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvYmYxODBlMmQtNWJlYS00YWViLThhYmEtOWVhMmYwOWU3YWVmXC9kZXUydXA2LThkNDVjMjAwLWUwNWQtNGM1ZC1iNDViLTA1ZDAxYWNmYzQyOS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Vo7oFfCQJXOWmwvoRDUVCksRun6nQ9gh20-61DnbBOY"
      },
      {
        id: 7,
        name: "Men's Corduroy Lapel Collar Thermal Fleece-lined Plaid Shirt Jacket S",
        price: "9,789",
        actualRate: "9,999",
        image: "https://i.pinimg.com/564x/40/b6/ea/40b6ea77f5916f5120406ce27fa1c0c6.jpg",
        banner: "https://st.depositphotos.com/1345889/1262/i/450/depositphotos_12627110-stock-photo-large-banner-with-gorgeous-happy.jpg"
      },
      {
        id: 8,
        name: "Calvin Klein K3M514B1 Minimal 40mm Mesh Strap Unisex Watch",
        price: "11,999",
        actualRate: "12,499",
        image: "https://i.pinimg.com/564x/3d/bd/88/3dbd885b326e461ae2cdc39f0e610edf.jpg",
        banner: "https://static.vecteezy.com/system/resources/previews/008/174/590/non_2x/fashion-advertising-web-banner-illustration-vector.jpg"
      },
      {
        id: 9,
        name: "Samsung T9 Portable External SSD 4TB",
        price: "17,999",
        actualRate: "24,000",
        image: "https://m.media-amazon.com/images/I/410dBGcnOfL._SX300_SY300_QL70_FMwebp_.jpg",
        banner: "https://images.squarespace-cdn.com/content/v1/54ec2161e4b01dbc251cbdae/8109841b-663b-476b-beee-e72bd234ee95/best-ideas-For-Successful-Banner-Advertising-30.jpg"
      },
      {
        id: 10,
        name: "BoldHealth Eye Mask with Cooling Gel for Dark Circles, Dry Eyes",
        price: "599",
        actualRate: "799",
        image: "https://m.media-amazon.com/images/I/61x+Ye8UoBL._SY450_.jpg",
        banner: "https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-1180x664.jpg"
      }
  ];
  
  export default products;
  