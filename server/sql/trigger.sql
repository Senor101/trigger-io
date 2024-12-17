

-- Function to notify change 
-- You can call this function whenever you need to notify your server
CREATE OR REPLACE FUNCTION public.notify_changes()
  RETURNS TRIGGER 
  LANGUAGE plpgsql
AS $FUNCTION$
DECLARE
  payload JSON;
  referencing_table RECORD;
  referencing_query TEXT;
  affected_rows JSON;
  referenced_value TEXT;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    payload := row_to_json(OLD);
  ELSE
    payload := row_to_json(NEW);
  END IF;

  EXECUTE FORMAT(
    'SELECT ($1).id'
  ) INTO referenced_value USING CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;

  PERFORM pg_notify('new_event',
    json_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'data', payload
    )::text
  );

  RAISE LOG 'Referencing table: %', referenced_value;
  RAISE LOG 'Processing table: %', TG_TABLE_NAME;

  FOR referencing_table IN 
    SELECT 
      tc.table_name AS referencing_table,
      kcu.column_name AS referencing_column,
      ccu.table_name AS referenced_table,
      ccu.column_name AS referenced_column
    FROM 
      information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
    WHERE 
      tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_name = TG_TABLE_NAME
  LOOP

  RAISE LOG 'Referencing table: %', row_to_json(referencing_table);

    referencing_query := FORMAT(
      'SELECT json_agg(row_to_json(t)) FROM %I t WHERE t.%I = $1',
      referencing_table.referencing_table,
      referencing_table.referencing_column
    );

    EXECUTE referencing_query INTO affected_rows USING referenced_value;

    IF affected_rows IS NOT NULL THEN
      PERFORM pg_notify('new_event',
        json_build_object(
          'table', referencing_table.referencing_table,
          'operation', TG_OP || '(via reference)',
          'affected_rows', affected_rows
        )::text
      );
      END IF;
    END LOOP;

  RETURN NEW;
END;
$FUNCTION$

-- CREATE TRIGGER table_change_trigger
-- AFTER INSERT OR UPDATE OR DELETE ON 

DO $$
  DECLARE
    table_rec RECORD;
  BEGIN
    FOR table_rec IN
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
    LOOP
      RAISE NOTICE 'Processing table: %', table_rec.tablename;
      
      -- Drop trigger if it already exists to avoid conflicts
      EXECUTE format(
        'DROP TRIGGER IF EXISTS notification_trigger ON %I',
        table_rec.tablename
      );

      EXECUTE format(
        'CREATE TRIGGER notification_trigger 
        AFTER INSERT OR UPDATE OR DELETE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION notify_changes()',
        table_rec.tablename
      );
    END LOOP;
  END $$;
