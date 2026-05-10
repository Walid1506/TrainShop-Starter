CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);

INSERT INTO products (name, description, price_cents, stock)
VALUES
  ('Billet Lyon → Paris', 'Trajet direct pour découvrir Docker.', 4500, 20),
  ('Billet Lyon → Marseille', 'Trajet pour un atelier DevOps.', 3900, 15),
  ('Guide Docker débutant', 'Support pédagogique pour comprendre les conteneurs.', 1900, 50),
  ('Pack GitHub Actions', 'Pack fictif pour apprendre la CI/CD.', 2900, 30);
