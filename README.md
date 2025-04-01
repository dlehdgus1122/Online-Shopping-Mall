# COMP3120 2023 Online Shopping mall

## npm start

## npm run server

First, I will explain the front end of the shopping mall.

If you press the upper left banner of the shopping mall, it will return to the initial screen.
A search window was added next to it, and a cart and an icon for logging in were placed next to the search window.

Event banners were placed at the bottom so that they could stand out, and a total of 12 products could be placed on one page. Because there are so many products, I used pagenation to click the number at the bottom to go to the page I want.

Products can be sorted in the latest order, the highest price, and the lowest price.

Click the product to enter the product details page, where you can find the image, tag, name, price, and delivery cost of the product. If you adjust the quantity and click the cart button, you can check the list of products selected by the user in the shopping cart. In the shopping cart, the number of products selected by the user can be added or reduced, or it can be excluded altogether. If you check the check box of the product you want to purchase, the total price will appear at the bottom.

Next, I will explain the backend.

You can see the server of the shopping mall at
http://localhost:3001
http://localhost:3001/products lists products
http://localhost:3001/products/id products that fit the id,
http://localhost:3001/orders provides an order list,
You can view a list of categories at localhost:3001/categories.

Product and id, categories and tags can be viewed on the product details page and main screen.
